const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
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
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    adult: {
      type: Boolean,
    },
    subscribed: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
