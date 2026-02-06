const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
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
      unique: true,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone number",
      },
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      // select: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Password Hashing
userSchema.pre("save", async function (next) {
  // Only hash the password if it is new or has been modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
