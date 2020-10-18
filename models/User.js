const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, maxLength: 50 },
  lastname: { type: String, maxLength: 50 },
  email: { type: String, trim: true, unique: true },
  password: { type: String, minlength: 5 },
  role: { type: Number, default: 0 },
  image: { type: String },
  token: { type: String },
  tokeExp: { Type: Number },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
