const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { makeOtp } = require('../utils/otp');
const {sendEmail } = require('../utils/sendotp');
const authenticate = require('../middlewares/authenticate');
const ClearbitLogo = require('clearbit-logo');

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
         let subject = "AuthFactor OTP";
         let to = email;
         let from = process.env.EMAIL;
         let text = `Your OTP is ${otp}`;
         sendEmail({ subject, text, to , from});
         
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

   app.get('/userdata',authenticate, async(req, res) => {
      try {
         res.status(200).send({ success: true , user: req.user});
      } catch (error) {
         res.status(500).send({ success: false, message: 'Server Error', messages: error.message });
      }
   });

   app.post('/addAccount',authenticate, async(req, res) => {
      try {
         const user = await User.findById(req.user.id);
         if (!user)
            return res.status(200).send({ success: false, message: 'User Not Found'});
         
         const {name, secret, period, issuer, imageurl} = req.body;

         
         for(var i=0;i<user.account.length;i++){
            if(user.account[i].secret == secret){
               return res.status(200).send({ success: false, message: 'Already Exists Account'});
            }
         }

         user.account.push({name, secret, period, issuer, imageurl});
         const updateuser = await user.save();

         res.status(200).send({ success: true , user: updateuser});
      } catch (error) {
         res.status(500).send({ success: false, message: 'Server Error', messages: error.message });
      }
   });

   app.post('/deleteAccount',authenticate, async(req, res) => {
      try {
         const {accountId} = req.body;
         const user = await User.findById(req.user.id);
         if (!user)
            return res.status(200).send({ success: false, message: 'User Not Found'});
         
         for(var i=0;i<user.account.length;i++){
            if(user.account[i]._id == accountId){
               await user.account.pull(accountId);
            }
         }

         const updateuser = await user.save();
         res.status(200).send({ success: true , user: updateuser});

      } catch (error) {
         res.status(500).send({ success: false, message: 'Server Error', messages: error.message });
      }
   });


   app.post('/companyName', async(req, res) => {
      const {issuer} = req.body;

      var imageurl = "https://i.ibb.co/6tqWrTG/qr.png";
      let logo = new ClearbitLogo;
      const data  = await logo.topSuggestion(issuer)
      
      if(data){
         imageurl = data.logo;
      }
      
      res.status(200).send({ success: true , imageurl});
   })
};
