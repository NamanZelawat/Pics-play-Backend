const express = require("express");
const router = express.Router();
const auth = require("./auth");
const chat = require("./chat");
const verify = require("./verify");
const post = require("./post");
const me = require("./me");
const search = require("./search");
const otp = require("./otp");

router.use("/", verify);
router.use("/auth", auth);
router.use("/chat", chat);
router.use("/post", post);
router.use("/me", me);
router.use("/search", search);
router.use("/otp", otp);

module.exports = router;
