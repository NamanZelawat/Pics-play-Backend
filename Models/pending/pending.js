const dbase = require("./../../Schemas/userSchema");

function pending(username) {
  return new Promise((resolve, reject) => {
    dbase
      .findOne({
        username: username,
      })
      .then(function (data) {
        return resolve({
          success: true,
          data: data.pending,
        });
      })
      .catch(function (err) {
        reject({
          success: false,
          msg: "Some error in loading pending",
          err,
        });
      });
  });
}

module.exports = pending;
