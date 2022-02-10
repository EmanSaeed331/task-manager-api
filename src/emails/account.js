const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey)
// Test Message 
/* const TestMassage = {
    to: 'emansaeed5330@gmail.com', // Change to your recipient
    from: 'emansaeed5330@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(TestMassage)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    }) */

// send welcome Email 
const sendWelcomeEmails = (email,name)=>{sgMail.send({
    to :email,
    from:'emansaeed5330@gmail.com',
    subject:'Thanks for joining in ..!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`

})
}
//send cancelation message 
const sendCancelationEmail = (email,name) =>{
    sgMail.send({
        to:email , 
        from :'emansaeed5330@gmail.com',
        subject:'Remove account',
        text:`Really ..! ${name} need you leave us ..! Tell us the reason for removing your account ` 
    })
}
 
module.exports = {
    sendWelcomeEmails,
    sendCancelationEmail

}