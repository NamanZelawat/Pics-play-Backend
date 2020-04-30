const express = require("express");
const router = express.Router();
const home = require("./../../../Models/home");
const middleware = require("./../../Middleware");

router.get("/", middleware, function (req, res) {
  home(req.body.username)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/logout", middleware, function (req, res) {
  res.json({
    success: true,
  });
});

module.exports = router;
