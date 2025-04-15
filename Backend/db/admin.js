const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "USER",
  },
  name: String,
  status: String,
  password: String,
  date: String,
  email: String,
});
module.exports = mongoose.model("admin", adminSchema);
