const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
 name: String,
  email: String,
  pass: String,
});

const UserModel = mongoose.model("Dealers", userSchema);

module.exports = {
  UserModel,
};