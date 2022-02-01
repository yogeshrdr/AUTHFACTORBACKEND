const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


exports.sendemail = async (email, otp) => {
   try{
      const msg = {
         to: email,
         from: 'crystaleyes901@gmail.com',
         subject: 'OTP for Authfactor',
         text: 'OTP for Authfactor is ',
         html: `OTP for Authfactor is:<strong>${otp}</strong>`,
      }
      await sgMail.send(msg);
      return true;
   }catch(error){
      return false;
   }
}