const express = require("express");
const app = express();
const router = require("./Controllers");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static("Public"));

app.use(cookieParser());

app.use(router);

module.exports = app;
