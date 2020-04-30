const dbase = require("../../Schemas/userSchema");
const cbase = require("./../../Schemas/chatSchema");

function requestAccept(username, keyword) {
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
                friends: {
                  username: data.username,
                  profileImg: data.profileImg,
                  bio: data.bio,
                },
              },
            }
          )
          .then(function (data) {
            dbase
              .findOneAndUpdate(
                {
                  username: username,
                },
                {
                  $pull: {
                    pending: {
                      username: keyword,
                    },
                  },
                  $push: {
                    friends: {
                      username: data.username,
                      profileImg: data.profileImg,
                      bio: data.bio,
                    },
                  },
                }
              )
              .then(function (data) {
                cbase
                  .create({
                    username: [username, keyword],
                  })
                  .then(function (data) {
                    return resolve({
                      success: true,
                    });
                  })
                  .catch(function (err) {
                    return reject({
                      success: false,
                    });
                  });
              })
              .catch(function (err) {
                return reject({
                  success: false,
                  msg: "Error in accepting request",
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

module.exports = requestAccept;
