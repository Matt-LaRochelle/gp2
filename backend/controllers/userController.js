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
        const year = user.year

        res.status(200).json({email, fName, year, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {email, password, fName, year} = req.body

    try {
        const user = await User.signup(email, password, fName, year)

        // create a token
        const token = createToken(user._id)

        // Let server know everything is good
        res.status(200).json({email, fName, year, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// send reset password link
const forgotUser = async (req, res) => {
    const email = req.body.email
    console.log("step 1: email: " + email)

    try {
        const user = await User.forgot(email)
        console.log("step 2: user: " + user)
        console.log("step 3: user.id: " + user._id)

        // create a token
        const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '1h' })
        console.log("step 4: token: " + token)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();
        console.log("step 5: saved user data")
        // create the email
        const message = {
            to: user.email,
            from: 'mattsdevprojects@gmail.com',
            subject: 'Password reset link',
            html: '<p>Click <a href="https://guitar-paths-api.onrender.com/api/user/reset?token=' + user.resetPasswordToken + '>here"</a> to reset your password.</p>',
          };
        // send the email
        sgMail.send(message)
        .then(() => {
            console.log('step 6: Email sent');
        })
        .catch((error) => {
            console.error('step 6 failed: ' + error);
        });
        res.status(200).json({message: "step 7: backend got it!"})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// reset password from email link
const verifyLink = async (req, res) => {
    const { token }= req.query;
    console.log(token)
    try {
            // Look up the user by token
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      // If the token is invalid or has expired, render an error message or redirect to an error page
      return res.status(400).send('Invalid or expired password reset token');
    }
    // Render the password reset form with the token as a hidden input
    res.render('reset-password', { token });
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
    


module.exports = { signupUser, loginUser, forgotUser, verifyLink }