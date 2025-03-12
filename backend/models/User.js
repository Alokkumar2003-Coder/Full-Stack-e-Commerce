const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    role:{
      type:Number,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User",User);
