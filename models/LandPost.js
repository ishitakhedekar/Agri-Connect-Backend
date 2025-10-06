const mongoose = require("mongoose");

const landPostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  description: String,
  location: String,
  soilType: String,
  area: String,
  availableFrom: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LandPost", landPostSchema);
