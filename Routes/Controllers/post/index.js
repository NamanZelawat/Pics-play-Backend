const express = require("express");
const router = express.Router();
const uploadFiles = require("./../../../Models/post");
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

router.post("/", upload.single("file"), middleware, function (req, res) {
  uploadFiles(req.body.username, req.file)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
