const express = require("express");
const router = express.Router();
const { sendMessage, getConversation } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, sendMessage);
router.get("/:withUser", authMiddleware, getConversation);

module.exports = router;
