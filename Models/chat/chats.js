const dbase = require("./../../Schemas/userSchema");

function chats(username) {
  return new Promise((resolve, reject) => {
    dbase
      .findOne({
        username: username,
      })
      .then(function (data) {
        return resolve({
          success: true,
          data: data.friends,
        });
      })
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Unable to fetch friends",
          err,
        });
      });
  });
}

module.exports = chats;
