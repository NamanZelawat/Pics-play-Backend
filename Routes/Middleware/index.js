const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
  if (req.headers.token == undefined) {
    res.status(403);
    res.json({
      success: false,
      msg: "No token found",
    });
  } else {
    jwt.verify(req.headers.token, "secretKey", function (err, data) {
      if (err) {
        res.status(403);
        res.json({
          success: false,
          msg: "No token found",
        });
      } else if (data.user.email != undefined) {
        req.body.username = data.user.username;
        next();
      } else {
        res.status(403);
        res.json({
          success: false,
          msg: "Token incorrect",
        });
      }
    });
  }
}

module.exports = middleware;
