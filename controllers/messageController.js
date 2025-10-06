const Message = require("../models/Message");

// Send a message
exports.sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const message = new Message({
      sender: req.user.userId,
      receiver: receiverId,
      content
    });

    await message.save();
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
};

// Get messages between two users
exports.getConversation = async (req, res) => {
  const userId = req.user.userId;
  const { withUser } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: withUser },
        { sender: withUser, receiver: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
};
