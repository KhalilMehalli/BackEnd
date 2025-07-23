const nodemailer = require("nodemailer");

const FROM_EMAIL="serbaoloto@gmail.com"

// Configuration of the transport nodemailler 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",              
  port: 587,
  auth: {
    user: FROM_EMAIL,               
    pass: process.env.EMAIL_MDP,               
  },
});

/* test in local
transporter.verify(err => {
  if (err) console.error(" smtp error:", err);
  else     console.log("smtp good");
});
*/

module.exports = transporter;