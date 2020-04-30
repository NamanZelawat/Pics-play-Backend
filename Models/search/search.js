const dbase = require("./../../Schemas/userSchema");

function search(keyword, username) {
  return new Promise((resolve, reject) => {
    dbase
      .aggregate([
        {
          $match: {
            $and: [
              {
                username: {
                  $regex: ".*" + keyword + ".*",
                },
              },
              {
                verified: true,
              },
              {
                username: {
                  $ne: username,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            username: 1,
            email: 1,
            profileImg: 1,
            bio: 1,
          },
        },
      ])
      .then(function (data) {
        return resolve({
          success: true,
          data,
        });
      })
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Search unsuccessful try again",
          err,
        });
      });
  });
}

module.exports = search;
