const dbase = require("./../../Schemas/userSchema");

function otp(query) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          otp: query,
        },
        {
          verified: true,
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
          msg: "Verification failed",
          err,
        });
      });
  });
}

module.exports = otp;
