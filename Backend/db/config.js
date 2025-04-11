const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/E-dashboard")
  .then(() => console.log("DB connected"));
