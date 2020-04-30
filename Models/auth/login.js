const dbase = require("./../../Schemas/userSchema");

function login(body) {
  return new Promise((resolve, reject) => {
    dbase
      .findOne({
        email: body.email,
        password: body.password,
      })
      .then(function (data) {
        if (data.verified == true) {
          resolve({
            success: true,
            username: data.username,
          });
        } else {
          reject({
            success: false,
            msg: "Verify your email",
          });
        }
      })
      .catch(function (err) {
        reject({
          success: false,
          msg: "No entry found please signup",
          err,
        });
      });
  });
}

module.exports = login;
