require('dotenv').config()
const nodemailer = require('nodemailer')

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return { statusCode: 405, body: 'Not Allowed' }
  }

  const { email, message } = JSON.parse(event.body)
  if (!email || !message) {
    return { statusCode: 400, body: 'Please provide ALL values' }
  }

  const data = {
    from: `${email}`,
    to: `${EMAIL_USER}`,
    subject: 'お問い合わせフォームからお問い合わせがありました',
    html: `<p>${message}</p>`,
  }

  try {
    await transporter.sendMail({ ...data })
    return { statusCode: 200, body: 'success' }
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error.message) }
  }
}
