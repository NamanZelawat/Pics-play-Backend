const dbase = require("../../Schemas/userSchema");

function requestSend(username, keyword) {
  return new Promise((resolve, reject) => {
    dbase
      .findOne({
        username: username,
      })
      .then(function (data) {
        dbase
          .findOneAndUpdate(
            {
              username: keyword,
            },
            {
              $push: {
                pending: {
                  username: data.username,
                  profileImg: data.profileImg,
                  bio: data.bio,
                },
              },
            }
          )
          .then(function (data) {
            return resolve({
              success: true,
            });
          })
          .catch(function (err) {
            return reject({
              success: false,
              msg: "Some error occured try again",
              err,
            });
          });
      })
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Some error occured try again",
          err,
        });
      });
  });
}

module.exports = requestSend;
