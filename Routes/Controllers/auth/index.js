const express = require("express");
const router = express.Router();
const { signup, login } = require("./../../../Models/auth");
const jwt = require("jsonwebtoken");

router.post("/signup", function (req, res) {
  var farFuture = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10 * 10
  );
  signup(req.body)
    .then(function (data) {
      res.cookie("username", req.body.username, { expires: farFuture });
      res.cookie("email", req.body.email, { expires: farFuture });
      res.status(200);
      res.json(data);
    })
    .catch(function (err) {
      res.status(400);
      res.json(err);
    });
});

router.post("/login", function (req, res) {
  var farFuture = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10 * 10
  );
  login(req.body)
    .then(function (data) {
      jwt.sign(
        { user: { email: req.body.email, username: data.username } },
        "secretKey",
        function (err, token) {
          if (err) {
            res.status(500);
            res.json({
              success: false,
              msg: "Token cannot be made",
              err,
            });
          } else {
            res.cookie("username", data.username, { expires: farFuture });
            res.cookie("email", req.body.email, { expires: farFuture });

            res.status(200);
            res.json({
              success: true,
              token: token,
            });
            res.redirect("http://localhost:3000");
          }
        }
      );
    })
    .catch(function (err) {
      res.status(403);
      res.json(err);
    });
});

module.exports = router;
