const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default:false,
    },
    verificationToken:{
      type: String ,
      required: false,
    },
    resetPassword: {
      type: Boolean || null,
      required: false,
      default: false,
    },
    resetPasswordToken: {
      type: String || null,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
