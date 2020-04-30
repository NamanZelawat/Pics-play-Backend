const dbase = require("./../../Schemas/userSchema");

function savePost(username, url) {
  return new Promise((resolve, reject) => {
    dbase
      .updateOne(
        {
          username: username,
        },
        {
          $push: {
            posts: {
              username: username,
              url: url + "?raw=true",
              date: new Date().toISOString().slice(0, 19).replace("T", " "),
              timestamp: new Date(),
            },
          },
        }
      )
      .then(function (data) {
        return resolve({ success: true });
      })
      .catch(function (err) {
        return reject({ success: false, msg: "Problem in saving post", err });
      });
  });
}

module.exports = savePost;
