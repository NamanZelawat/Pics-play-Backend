const dbase = require("./../../Schemas/chatSchema");

function chatAdd(username, keyword, message) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          username: { $all: [username, keyword] },
        },
        {
          $push: {
            chats: { message: message, sender: username },
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
          msg: "Unable to fetch friends",
          err,
        });
      });
  });
}

module.exports = chatAdd;
