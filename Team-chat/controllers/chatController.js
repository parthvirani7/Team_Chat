const ChatMessage = require('../models/chatModel');
exports.getChatMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await ChatMessage.find({ roomId }).populate('sender', 'name email');
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
