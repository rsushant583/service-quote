// Minimal Express backend for sending quote details via Nodemailer
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// POST /send-quote: Send quote details to admin email
app.post('/send-quote', async (req, res) => {
  const { name, email, phone, plan, amount, ...rest } = req.body;
  if (!name || !email || !plan || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // App Password
    },
  });

  // Compose the email
  let html = `<h2>New Quote Submitted</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || ''}</p>
    <p><strong>Plan:</strong> ${plan}</p>
    <p><strong>Amount:</strong> ₹${amount}</p>`;
  for (const key in rest) {
    html += `<p><strong>${key}:</strong> ${rest[key]}</p>`;
  }

  try {
    await transporter.sendMail({
      from: `Quote App <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Service Quote Submission',
      html,
    });
    res.json({ success: true, message: 'Quote sent to admin email' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Quote Email Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
