const Score = require('../models/scoreModel')
const mongoose = require('mongoose')

// get all scores
const getScores = async (req, res) => {
    const user_id = req.user._id

    const scores = await Score.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(scores)
}

// get a single score
const getScore = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const score = await Score.findById(id)

    if (!score) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(score)
}


// create a new score
const createScore = async (req, res) => {
    const {single, interval, chord, scale, progression} = req.body
    console.log(req.body)

    if (single !==0 || interval !==0 || chord !==0 || scale !==0 || progression !==0) {
        return res.status(400).json({ error: 'Set up malfunction - all fields must be 0'})
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const newScore = await Score.create({single, interval, chord, scale, progression, user_id})
        res.status(200).json(newScore)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a score
const deleteScore = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const score = await Score.findOneAndDelete({_id: id})

    if (!score) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(score)
}


// update a score
const updateScore = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }
    console.log(req.body)
    const score = await Score.findOneAndUpdate({_id: id}, {
        ...req.body
    }, { new: true })

    if (!score) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(score)
    console.log(score)
}


module.exports = {
    getScores,
    getScore,
    createScore,
    deleteScore,
    updateScore
}