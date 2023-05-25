const express = require('express')
const {
    getPractices,
    getPractice,
    createPractice,
    deletePractice,
    updatePractice
} = require('../controllers/practiceController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all practices
router.get('/', getPractices)

// GET a single practice
router.get('/:id', getPractice)

// POST a new practice
router.post('/', createPractice)

// DELETE a practice entry
router.delete('/:id', deletePractice)

// PATCH a practice entry
router.patch('/:id', updatePractice)


module.exports = router