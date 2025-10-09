const LandPost = require("../models/LandPost");

// ✅ Create new land post
exports.createLand = async (req, res) => {
  // Destructure the updated fields from the request body
  const { 
    title, 
    description, 
    location, 
    area, 
    leaseDuration,
    yieldDistribution,
    landType, 
    contactName, 
    contactPhone, 
    contactEmail, 
    imageUrl 
  } = req.body;

  try {
    const newPost = new LandPost({
      owner: req.user.userId, // from JWT middleware
      title,
      description,
      location,
      area,
      leaseDuration,
      yieldDistribution,
      landType,
      contactName,
      contactPhone,
      contactEmail,
      imageUrl
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

// ✅ Get a single land post by ID
exports.getLandById = async (req, res) => {
  try {
    const land = await LandPost.findById(req.params.id).populate("owner", "name email");
    if (!land) {
      return res.status(404).json({ message: "Land post not found" });
    }
    res.status(200).json(land);
  } catch (err) {
    res.status(500).json({ message: "Error fetching land post", error: err.message });
  }
};