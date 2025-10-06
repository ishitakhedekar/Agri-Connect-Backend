const LandPost = require("../models/LandPost");

// ✅ Create new land post (landowners only)
exports.createLand = async (req, res) => {
  const { title, description, location, soilType, area, availableFrom } = req.body;

  // Only landowners can post land
  if (req.user.role !== "landowner") {
    return res.status(403).json({ message: "Only landowners can create land posts" });
  }

  try {
    const newPost = new LandPost({
      owner: req.user.userId, // from JWT middleware
      title,
      description,
      location,
      soilType,
      area,
      availableFrom,
    });

    await newPost.save();
    res.status(201).json({ message: "Land post created successfully", land: newPost });
  } catch (err) {
    res.status(500).json({ message: "Error creating land post", error: err.message });
  }
};

// ✅ Get all land posts (public route)
exports.getAllLands = async (req, res) => {
  try {
    const lands = await LandPost.find().populate("owner", "name email");
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lands", error: err.message });
  }
};
