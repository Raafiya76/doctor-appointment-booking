const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: [true, "Please tell us your Prefix!"],
    },
    fullName: {
      type: String,
      required: [true, "Please tell us your full name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone number",
      },
      required: [true, "Please provide your phone number"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    specialization: {
      type: String,
      required: [true, "Please provide your specialization"],
    },
    experience: {
      type: String,
      required: [true, "Please provide your experience"],
    },
    feePerConsultation: {
      type: Number,
      required: [true, "Please provide your fee per consultation"],
    },
    fromTime: {
      type: String,
      required: [true, "Please provide your from time"],
    },
    toTime: {
      type: String,
      required: [true, "Please provide your to time"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = new mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
