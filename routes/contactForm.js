const express = require('express');
const transporter = require('../config/nodemailer');
const router = express.Router();

const FROM_EMAIL="serbaoloto@gmail.com"
const TO_EMAIL="khalilmehalli@gmail.com"

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;


  const mailOptions = {
    from:    "Contact Form <" + FROM_EMAIL + ">",
    replyTo: email,
    to:      TO_EMAIL,
    subject: "Message de " + name + "depuis ton site web",
    text:    "Nom   : " + name + "\nEmail : " + email + "\n\n" + message,
};

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

module.exports = router;