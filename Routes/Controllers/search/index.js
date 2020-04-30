const express = require("express");
const router = express.Router();
const middleware = require("./../../Middleware");
const { search, user } = require("./../../../Models/search");
const { requestSend, requestAccept } = require("./../../../Models/request");
const cors = require("cors");

router.post("/", middleware, function (req, res) {
  search(req.body.keyword, req.body.username)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/:user", middleware, function (req, res) {
  user(req.body.username, req.params.user)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/:user", middleware, function (req, res) {
  if (req.headers.status == 0) {
    requestAccept(req.body.username, req.params.user)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  } else {
    requestSend(req.body.username, req.params.user)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  }
});

module.exports = router;
