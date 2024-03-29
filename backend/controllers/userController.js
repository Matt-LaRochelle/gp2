const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        // get extra user information for application
        const fName = user.fName
        const birthday = user.birthday

        res.status(200).json({email, fName, birthday, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password, fName, birthday} = req.body

    let emptyFields = []

    if (!email) {
        emptyFields.push('email')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!fName) {
        emptyFields.push('fName')
    }
    if (!birthday) {
        emptyFields.push('birthday')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields})
    }

    try {
        const user = await User.signup(email, password, fName, birthday)

        // create a token
        const token = createToken(user._id)

        // Let server know everything is good
        res.status(200).json({email, fName, birthday, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// send reset password link to email
const forgotUser = async (req, res) => {
    const email = req.body.email

    try {
        const user = await User.forgot(email)

        // create a token
        const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '1h' })
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();

        // create the email
        const message = {
            to: user.email,
            from: 'mattsdevprojects@gmail.com',
            subject: 'Password reset link',
            html: `<p>Click <a href="https://guitar-paths.onrender.com/reset-password/${user.resetPasswordToken}">here</a> to reset your password.</p>`,
          };
        // send the email
        sgMail.send(message)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error('Send email failed: ' + error);
        });
        res.status(200).json({message: "Final step: backend got it!"})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// verifies link from email
const verifyLink = async (req, res) => {
    const token = req.body.token;
    console.log(token)
    try {
            // Look up the user by token
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      // If the token is invalid or has expired, render an error message or redirect to an error page
      return res.status(400).send('Invalid or expired password reset token');
    }
    // Render the password reset form with the token as a hidden input
    res.json({ token });
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(400).json({error: err.message})
  }
}

// reset the password
const resetPassword = async (req, res) => {
    const { token, password }= req.body
    console.log("token: " + token, "password: " + password)
    try {
        // Look up the user by token
    const validUser = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!validUser) {
    // If the token is invalid or has expired, render an error message or redirect to an error page
    return res.status(400).send('Invalid or expired password reset token');
    }
    // Render the password reset form with the token as a hidden input
    const user = await User.reset(token, password)
    res.json({ user });
    } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(400).json({error: err.message})
    }
}
    


module.exports = { signupUser, loginUser, forgotUser, verifyLink, resetPassword }