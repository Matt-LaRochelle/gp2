const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Number
    }
})

// static signup method
userSchema.statics.signup = async function(email, password, fName, year) {

    // validation
    console.log(email, password, fName, year);
    if (!email || !password || !fName || !year) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error ('Email already in use')
    }

    const resetPasswordToken = null
    const resetPasswordExpires = null

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, fName, year, resetPasswordToken, resetPasswordExpires })
    
    return user

}

// static login method
userSchema.statics.login = async function(email, password) {

        if (!email || !password) {
            throw Error('All fields must be filled')
        }

        const user = await this.findOne({ email })

        if (!user) {
            throw Error ('Incorrect email')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error('Incorrect password')
        }

        return user

}

// static forgot method
userSchema.statics.forgot = async function (email) {
    if (!email) {
        throw Error('Must include an email')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error ('Incorrect email')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)