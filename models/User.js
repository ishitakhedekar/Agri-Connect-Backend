const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["landowner", "farmer"],
    required: true
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  address: { type: String, required: true },
  bio: { type: String, default: "" }
});

module.exports = mongoose.model("User", userSchema);