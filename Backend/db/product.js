const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  ImageUrl: String,
  type: {
    type: String,
    default: "USER",
  },
});

module.exports = mongoose.model("products", productSchema);
