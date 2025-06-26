# Service Quote Backend (Express + Nodemailer)

This is a minimal Node.js/Express backend for sending quote request details to your admin email using Nodemailer and Gmail SMTP. Deployable to Render, Railway, or any Node.js host.

## Features
- POST `/send-quote`: Accepts quote form data and sends all details to your admin email
- Uses Gmail App Password for secure SMTP
- CORS enabled for frontend integration

## Setup
1. Clone this repo or copy this folder to your backend project
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials:
   - `GMAIL_USER`: Your Gmail address
   - `GMAIL_PASS`: Your Gmail App Password
   - `ADMIN_EMAIL`: Your admin/notification email address
   - `PORT`: (optional) Port to run the server (default 8080)

## Running Locally
```sh
npm install
cp .env.example .env # Edit .env with your real values
npm start
```

## Deploying to Render
- Create a new Node.js web service on [Render](https://render.com/)
- Add your `.env` variables in the Render dashboard
- Set the start command to `npm start`

## Example Request
```http
POST /send-quote
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 8000000000",
  "plan": "Premium",
  "amount": 39000
}
```

## Security
- Never commit your real `.env` file or credentials to git!
- Use App Passwords for Gmail (not your real Gmail password)

---
