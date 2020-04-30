const dbase = require("./../../Schemas/userSchema");

function bioUpdate(username, bio) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          username: username,
        },
        {
          bio: bio,
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
          msg: "Technical error try again",
          err,
        });
      });
  });
}

module.exports = bioUpdate;
