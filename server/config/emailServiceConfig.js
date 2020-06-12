module.exports = {
  provider: process.env.EMAIL_PROVIDER,
  nodemailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  sgMail: {
    apiKey: process.env.SEND_GRID_API_KEY
  }
};
