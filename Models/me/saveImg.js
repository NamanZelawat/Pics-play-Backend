const dbase = require("./../../Schemas/userSchema");

function saveImg(username, url) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          username: username,
        },
        {
          profileImg: url + "?raw=true",
        }
      )
      .then(function (data) {
        dbase
          .updateMany(
            {
              "friends.username": username,
            },
            {
              $set: {
                "friends.$.profileImg": url + "?raw=true",
                "friends.$.bio": data.bio,
              },
            }
          )
          .then(function () {
            return resolve({ success: true });
          })
          .catch(function (err) {});
      })
      .catch(function (err) {
        return reject({ success: false, msg: "Problem in saving post", err });
      });
  });
}

module.exports = saveImg;
