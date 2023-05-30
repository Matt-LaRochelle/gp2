const Practice = require('../models/practiceModel')
const mongoose = require('mongoose')

// get all practice journal entries
const getPractices = async (req, res) => {
    const user_id = req.user._id

    const practices = await Practice.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(practices)
}

// get a single practice entry
const getPractice = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const practice = await Practice.findById(id)

    if (!practice) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(practice)
}


// create a new practice entry
const createPractice = async (req, res) => {
    const {entry} = req.body
    console.log(entry)

    if (!entry) {
        return res.status(400).json({ error: 'Cannot submit empty fields'})
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const practice = await Practice.create({entry, user_id})
        res.status(200).json(practice)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a practice entry
const deletePractice = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const practice = await Practice.findOneAndDelete({_id: id})

    if (!practice) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(practice)
}


// update a workout
const updatePractice = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const practice = await Practice.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!practice) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(practice)
}


module.exports = {
    getPractices,
    getPractice,
    createPractice,
    deletePractice,
    updatePractice
}