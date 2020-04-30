const express = require("express");
const router = express.Router();
const middleware = require("./../../Middleware");
const { chats, chatAdd, chatFetch } = require("./../../../Models/chat");

router.get("/", middleware, function (req, res) {
  chats(req.body.username)
    .then(function (data) {
      res.json({ success: true, data: data.data });
    })
    .catch(function (err) {
      res.json({
        success: false,
        msg: "Cannot fetch friends",
        err,
      });
    });
});

router.get("/:user", middleware, function (req, res) {
  chatFetch(req.body.username, req.params.user)
    .then(function (data) {
      res.json({ success: true, data: data.data });
    })
    .catch(function (err) {
      res.json({
        success: false,
        msg: "Cannot fetch friends",
        err,
      });
    });
});

router.post("/:user", middleware, function (req, res) {
  chatAdd(req.body.username, req.params.user, req.body.message)
    .then(function (data) {
      res.json({ success: true, data: data.data });
    })
    .catch(function (err) {
      res.json({
        success: false,
        msg: "Cannot fetch friends",
        err,
      });
    });
});

module.exports = router;
