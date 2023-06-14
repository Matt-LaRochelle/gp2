const express = require('express')

// controller functions
const { signupUser, loginUser, forgotUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// reset password route
router.post('/forgot', forgotUser)

module.exports = router