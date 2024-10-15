
const ChatMessage = require('../models/chatModel');

const saveMessage = async (messageData) => {
  const message = new ChatMessage(messageData);
  return await message.save();
};

const getMessagesByRoom = async (roomId) => {
  return await ChatMessage.find({ roomId }).sort({ createdAt: 1 });
};

module.exports = {
  saveMessage,
  getMessagesByRoom,
};
