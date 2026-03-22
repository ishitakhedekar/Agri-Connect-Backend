const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, changePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;