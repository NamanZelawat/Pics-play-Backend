const express = require("express");
const router = express.Router();
const otp = require("./../../../Models/otp");

router.get("/", function (req, res) {
  otp(req.query.otp)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
