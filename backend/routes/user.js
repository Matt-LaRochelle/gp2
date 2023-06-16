const express = require('express')

// controller functions
const { signupUser, loginUser, forgotUser, verifyLink } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// send password reset link route
router.post('/forgot', forgotUser)

// reset password from email route
router.post('/reset', verifyLink)

module.exports = router