const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scoreSchema = new Schema({
    single: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Score', scoreSchema)