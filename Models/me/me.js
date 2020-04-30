const dbase = require("./../../Schemas/userSchema");

function me(username) {
  return new Promise((resolve, reject) => {
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
            username: 1,
            email: 1,
            pending: 1,
            friends: 1,
            posts: 1,
            profileImg: 1,
          },
        },
      ])
      .then(function (data) {
        return resolve({
          success: true,
          data: data[0],
        });
      })
      .catch(function (err) {
        reject({
          success: false,
          msg: "Some error in loading profile",
          err,
        });
      });
  });
}

module.exports = me;
