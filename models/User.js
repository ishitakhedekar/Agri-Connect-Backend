const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["landowner", "farmer"],
    required: true},
  phonenumber: {
    type: Number,
    required: true,
    unique: true,
    sparse: true // Add this to allow multiple documents to have no phone number
  },
  address: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
