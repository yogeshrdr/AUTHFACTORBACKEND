const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const UserSchema = new Schema({
   phone: {
      type: String,
      unique: true,
      required: 'Phone Number is Required'
   },
   otp:{
      type:String,
   },
   // sites:[{
   //    sitename:{
   //       type:String,
   //    },
      
   // }]

}, { timestamps: true });


UserSchema.methods.generateJWT = function () {
   let payload = {
      id: this._id,
      phone: this.phone,
   };

   return jwt.sign(payload, process.env.JWT_SECRET, {});
};

UserSchema.methods.compareOtp = function (otp){
   return bcrypt.compareSync(otp, this.otp);
}

module.exports = mongoose.model('User', UserSchema);