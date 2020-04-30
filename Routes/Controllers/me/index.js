const express = require("express");
const router = express.Router();
const {
  me,
  bioUpdate,
  passUpdate,
  profileImgUpdate,
} = require("./../../../Models/me");
const middleware = require("./../../Middleware");
const path = require("path");
var multer = require("multer");
const upload = multer({
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

router.get("/", middleware, function (req, res) {
  me(req.body.username)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/bio", middleware, function (req, res) {
  bioUpdate(req.body.username, req.body.bio)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/password", middleware, function (req, res) {
  passUpdate(req.body.username, req.body.password)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/profileimg", upload.single("file"), middleware, function (
  req,
  res
) {
  profileImgUpdate(req.body.username, req.file)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
