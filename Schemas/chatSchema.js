const mongoose = require("mongoose");

const chats = new mongoose.Schema({
  username: {
    type: Array,
    required: true,
  },
  chats: {
    type: Array,
  },
});

var usersData = mongoose.model("Pics-play-chats", chats);

module.exports = usersData;
