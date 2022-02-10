const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey)

const msg = {
    to: 'emansaeed5330@gmail.com', // Change to your recipient
    from: 'emansaeed5330@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })