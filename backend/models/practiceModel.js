const mongoose = require('mongoose')

const Schema = mongoose.Schema

const practiceSchema = new Schema({
    entry: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Practice', practiceSchema)