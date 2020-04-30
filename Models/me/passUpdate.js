const dbase = require("./../../Schemas/userSchema");

function passUpdate(username, password) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          username: username,
        },
        {
          password: password,
        }
      )
      .then(function (data) {
        resolve({
          success: true,
        });
      })
      .catch(function (err) {
        reject({
          success: false,
          msg: "Technical error try again",
          err,
        });
      });
  });
}

module.exports = passUpdate;
