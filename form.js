// server.js

require('dotenv').config();  // Load .env into process.env     
const nodemailer = require('nodemailer');
const express = require('express');
const cors    = require('cors');

const app     = express();


const FROM_EMAIL="serbaoloto@gmail.com"
const TO_EMAIL="khalilmehalli@gmail.com"

//  Enable cors because my front and back are not in the same host 
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse incoming JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuration of the transport nodemailler 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",              
  port: 587,
  auth: {
    user: MY_EMAIL,               
    pass: process.env.EMAIL_MDP,               
  },
});


/* test in local
transporter.verify(err => {
  if (err) console.error(' smtp error:', err);
  else     console.log('smtp good');
});
*/

// receive form data and send email
app.post('/send', async (req, res) => {
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
    console.error('Erreur envoi mail :', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT =  3000;
app.listen(PORT, () => {

});
