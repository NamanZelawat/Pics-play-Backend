const express = require("express");
const router = express.Router();
const middleware = require("./../../Middleware");
const pending = require("../../../Models/pending");

router.get("/", middleware, function (req, res) {
  pending(req.body.username)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
