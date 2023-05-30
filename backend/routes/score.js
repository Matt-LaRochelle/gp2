const express = require('express')
const {
    getScores,
    getScore,
    createScore,
    deleteScore,
    updateScore
} = require('../controllers/scoreController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all scores
router.get('/', getScores)

// GET a single score
router.get('/:id', getScore)

// POST a new score
router.post('/', createScore)

// DELETE a score
router.delete('/:id', deleteScore)

// PATCH a score
router.patch('/:id', updateScore)


module.exports = router