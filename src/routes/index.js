const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { makeOtp } = require('../utils/otp');
const { sendwhatsapp, sendsms } = require('../utils/sendotp');

module.exports = function (app) {
   app.get('/', (req, res) => {
      res.status(200).send({ success: true, message: " Api Started" });
   });

   app.post('/login', async (req, res) => {
      try {
         const { phone, smstype } = req.body;
         const getuser = await User.findOne({ phone });
         let otp = await makeOtp();
         otp = otp.toString();
         if (smstype === 'whatsapp') {
            sendwhatsapp(phone,otp);
         } else if (smstype === 'sms') {
            sendsms(phone,otp);
         }
         otp = await bcrypt.hashSync(otp, 10);
         if (!getuser) {
            const newUser = new User({ phone, otp });
            const user = await newUser.save();
            res.status(200).send({ success: true, user });
         }
         else {
            getuser.otp = otp;
            const user = await getuser.save();
            res.status(200).send({ success: true, user });
         }

      } catch (error) {
         res.status(500).json({ success: false, message: error.message })
      }

   });


   app.get('/matchOtp', async (req, res) => {
      try {
         var { phone, otp } = req.body;
         const user = await User.findOne({ phone });
         otp = otp.toString();
         if (!user.compareOtp(otp))
            return res.status(401).json({ success: false, message: 'Invalid Otp' });

         res.status(200).json({ success: true , token:user.generateJWT(),user });
      } catch (error) {
         res.status(500).json({ success: false, message: 'Server Error', messages: error.message });
      }
   });
};