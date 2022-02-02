const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AccountSchema = new Schema({
   name:{
      type: String,
      required: 'Name is Required'
   },
   secret:{
      type: String,
      required: 'Secret is Required'
   },
   period:{
      type: Number,
      required: 'period is Required'
   },
   imageurl:{
      type: String,
   },
   issuer:{
      type: String,
   }
})

const UserSchema = new Schema({
   email: {
      type: String,
      unique: true,
      required: 'Email is Required'
   },
   otp:{
      type:String,
   },
   account:[{
      type: AccountSchema,
   }]

}, { timestamps: true });


UserSchema.methods.generateJWT = function () {
   let payload = {
      id: this._id,
      email: this.email,
   };

   return jwt.sign(payload, process.env.JWT_SECRET, {});
};

UserSchema.methods.compareOtp = function (otp){
   return bcrypt.compareSync(otp, this.otp);
}

module.exports = mongoose.model('User', UserSchema);