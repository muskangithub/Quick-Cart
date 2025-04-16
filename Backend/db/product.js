// This is a representation of your MongoDB schema
// You would typically put this in a separate file in your project
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  ImageUrl: String,
  // New fields added
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  type: {
    type: String,
    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
