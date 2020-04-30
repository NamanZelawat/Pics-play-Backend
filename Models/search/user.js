const dbase = require("./../../Schemas/userSchema");

function user(username, keyword) {
  return new Promise((resolve, reject) => {
    dbase
      .aggregate([
        {
          $match: {
            username: keyword,
          },
        },
        {
          $project: {
            _id: 0,
            username: 1,
            profileImg: 1,
            bio: 1,
            email: 1,
            friends: 1,
            pending: 1,
          },
        },
      ])
      .then(function (data) {
        dbase
          .aggregate([
            {
              $match: {
                username: username,
              },
            },
            {
              $project: {
                _id: 0,
                friends: 1,
                pending: 1,
              },
            },
          ])
          .then(function (d) {
            if (
              d[0].pending != undefined &&
              d[0].pending.some((pending) => pending.username === keyword)
            ) {
              data[0].status = "Accept";
            } else if (
              d[0].friends != undefined &&
              d[0].friends.some((pending) => pending.username === keyword)
            ) {
              data[0].status = "Friends";
            } else if (
              data[0].pending != undefined &&
              data[0].pending.some((pending) => pending.username === username)
            ) {
              data[0].status = "Pending";
            } else {
              data[0].status = "Send request";
            }

            return resolve({
              success: true,
              data: {
                username: data[0].username,
                email: data[0].email,
                bio: data[0].bio,
                profileImg: data[0].profileImg,
                friends: data[0].friends,
                status: data[0].status,
              },
            });
          })
          .catch(function (e) {
            return reject({
              success: false,
              msg: "Some error occured try again",
              e,
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

module.exports = user;
