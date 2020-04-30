const mongoose = require("mongoose");

const users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
    setDefaultOnInsert:
      "https://user-images.githubusercontent.com/44704257/80562128-63f93480-8a04-11ea-8efb-66add37e63cd.png",
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  friends: {
    type: Array,
    required: true,
    default: [],
  },
  pending: {
    type: Array,
    required: true,
    default: [],
  },
  messages: {
    type: Array,
    required: false,
  },
  posts: {
    type: Array,
    required: false,
    default: [],
  },
  first: {
    type: String,
    required: false,
  },
  last: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
    default: "Pics-play is awesome.",
  },
});

var usersData = mongoose.model("users", users);

module.exports = usersData;
