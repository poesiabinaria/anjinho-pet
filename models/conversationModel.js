const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./userModel");
const Message = require("./messageModel");
const Donation = require("./donationModel");

const Conversation = db.define("conversation", {
  conversationId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lastSeen: {
    type: Sequelize.DATE,
  },
});

Conversation.hasMany(Message, { foreignKey: "conversationId" });
Donation.hasOne(Conversation, { foreignKey: "donationId" });
User.hasMany(Conversation, { foreignKey: "userId" });
Conversation.belongsTo(User, { foreignKey: "userId" });

// User.belongsToMany(Conversation, {
//   through: "user_conversation",
//   foreignKey: "userId",
// });

// Conversation.belongsToMany(User, {
//   through: "user_conversation",
//   foreignKey: "conversationId",
// });

// Conversation.hasMany(Message);

module.exports = Conversation;
