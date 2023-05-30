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
    const {single} = req.body
    console.log(single)

    if (!single) {
        return res.status(400).json({ error: 'Cannot submit empty fields'})
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const newScore = await Score.create({single, user_id})
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

    const score = await Score.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!score) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(score)
}


module.exports = {
    getScores,
    getScore,
    createScore,
    deleteScore,
    updateScore
}