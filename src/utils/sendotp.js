require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendwhatsapp = (phone,otp) => {
   client.messages
      .create({
         body: `The OTP for Authfactor is : ${otp}`,
         from: 'whatsapp:+14155238886',
         to: `whatsapp:${phone}`,
      })
      .then(message => console.log(message.sid));
}

exports.sendsms = (phone,otp) => {
   client.messages
      .create({
         body: `The OTP for Authfactor is : ${otp}`,
         from: process.env.TWILIO_PHONE_NUMBER,
         to: phone,
      })
      .then(message => console.log(message.sid));
}