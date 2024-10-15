const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatSchema);
module.exports = ChatMessage;
