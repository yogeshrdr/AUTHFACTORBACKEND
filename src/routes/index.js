const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { makeOtp } = require('../utils/otp');
const {sendemail } = require('../utils/sendotp');

module.exports = function (app) {
   app.get('/', (req, res) => {
      res.status(200).send({ success: true, message: " Api Started" });
      
   });

   //login

   app.post('/login', async (req, res) => {
      try {
         const { email} = req.body;
         const getuser = await User.findOne({ email });
         let otp = await makeOtp();
         otp = otp.toString();
         const mail = await sendemail(email,otp) ;
         if(!mail){
            res.status(400).send({ success: false, message: "Email Not Found" });
         }
         otp = await bcrypt.hashSync(otp, 10);
         if (!getuser) {
            const newUser = new User({ email, otp });
            const user = await newUser.save();
            res.status(200).send({ success: true});
         }
         else {
            getuser.otp = otp;
            const user = await getuser.save();
            res.status(200).send({ success: true});
         }

      } catch (error) {
         res.status(500).send({ success: false, message: "Server Error"})
      }

   });


   app.post('/matchOtp', async (req, res) => {
      try {
         var { email, otp } = req.body;
         const user = await User.findOne({ email });
         otp = otp.toString();
         if (!user.compareOtp(otp))
            return res.status(200).send({ success: false, message: 'Invalid Otp' });

         res.status(200).send({ success: true , token:user.generateJWT(),user });
      } catch (error) {
         res.status(500).send({ success: false, message: 'Server Error', messages: error.message });
      }
   });
};
