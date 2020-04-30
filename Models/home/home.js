const dbase = require("./../../Schemas/userSchema");

function home(username) {
  return new Promise((resolve, reject) => {
    dbase
      .aggregate([
        {
          $match: {
            $or: [{ "friends.username": username }, { username: username }],
          },
        },
        {
          $unwind: "$posts",
        },
        {
          $group: {
            _id: 1,
            posts: {
              $push: "$posts",
            },
          },
        },
      ])
      .then(function (data) {
        data[0].posts.sort(function (x, y) {
          return y.timestamp - x.timestamp;
        });

        return resolve({
          success: true,
          data: data[0].posts,
        });
      })
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Unable to refresh feed",
          err,
        });
      });
  });
}

module.exports = home;
