const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,

  email: String,
  pass: String,
});

const UserModel = mongoose.model("Dealers", userSchema);

module.exports = {
  UserModel,
};