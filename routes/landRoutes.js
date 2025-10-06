const express = require("express");
const router = express.Router();
const { createLand, getAllLands } = require("../controllers/landController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createLand); // Only logged-in users
router.get("/", getAllLands); // Anyone can view land posts

module.exports = router;
