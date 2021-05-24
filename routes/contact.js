if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Contact form
router.post('/', async (req, res) => {
  try {
    const { contactName, contactEmail, contactMsg } = req.body;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `${contactName}`,
      to: process.env.EMAIL_ADDRESS,
      subject: 'Sweath Ecommerce - Contact',
      text: `Name: ${contactName}, Email: ${contactEmail}, Msg: ${contactMsg}`,
      html: `<p>Name: ${contactName}, Email: ${contactEmail}, Msg: ${contactMsg}</p>`,
    });

    res.send({ status: 200 });
  } catch {
    res.send({ status: 500 });
  }
});

module.exports = router;
