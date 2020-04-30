const cors = require("cors");
const express = require("express");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

const router = require("./Controllers");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   next();
// };

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(cors());

// app.use(express.static("Public"));

// app.use(cookieParser());

// app.use(router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(allowCrossDomain);
app.use(router);
app.use(express.static(__dirname + "/public"));

module.exports = app;
