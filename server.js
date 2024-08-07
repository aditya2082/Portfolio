const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Route for handling the contact form submission
app.post('/submit-form', (req, res) => {
  const { InputName, InputEmail, InputSubject, InputMessage } = req.body;

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityasingh.chandel18@gmail.com', // Replace with your email
      pass: 'teug ypuv ubuh fljy',  // Replace with your email password
    },
  });

  const mailOptions = {
    from: InputEmail,
    to: 'adityasingh.chandel18@gmail.com', // Replace with your email
    subject: InputSubject,
    text: `Name: ${InputName}\nEmail: ${InputEmail}\nMessage: ${InputMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending message');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
