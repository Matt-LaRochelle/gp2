const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        // get extra user information for application
        const fName = user.fName
        const year = user.year

        res.status(200).json({email, fName, year, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password, fName, year} = req.body

    try {
        const user = await User.signup(email, password, fName, year)

        // create a token
        const token = createToken(user._id)

        // Let server know everything is good
        res.status(200).json({email, fName, year, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// reset password
const forgotUser = async (req, res) => {
    const email = req.body.email
    console.log("step 1: email: " + email)

    try {
        const user = await User.forgot(email)
        console.log("step 2: user: " + user)
        console.log("step 3: user.id: " + user._id)

        // create a token
        const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '1h' })
        console.log("step 4: token: " + token)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();
        res.status(200).json({message: "backend got it!"})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser, forgotUser }