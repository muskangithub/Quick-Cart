const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  edu: {
    required: true,
    type: String,
  },
  mobile: Number,
  citymobile: String,
  city: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
