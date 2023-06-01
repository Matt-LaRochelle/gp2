const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scoreSchema = new Schema({
    single: {
        type: Number
    },
    interval: {
        type: Number
    },
    chord: {
        type: Number
    },
    scale: {
        type: Number
    },
    progression: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Score', scoreSchema)