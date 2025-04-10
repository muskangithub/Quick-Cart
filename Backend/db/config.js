const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myLoginRegisterDB")
  .then(() => console.log("DB connected"));
