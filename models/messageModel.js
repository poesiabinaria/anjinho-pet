const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./userModel");
// const Conversation = require("./conversationModel");

const Message = db.define("message", {
  messageId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Message, { as: "sender", foreignKey: "senderId" });
User.hasMany(Message, { as: "receiver", foreignKey: "receiverId" });

// Conversation.hasMany(Message, { foreignKey: "conversationId" });

module.exports = Message;
