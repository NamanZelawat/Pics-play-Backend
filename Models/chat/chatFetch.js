const dbase = require("./../../Schemas/chatSchema");

function chatFetch(username, keyword) {
  return new Promise((resolve, reject) => {
    dbase
      .findOne({
        username: { $all: [username, keyword] },
      })
      .then(function (data) {
        return resolve({
          success: true,
          data: data.chats,
        });
      })
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Unable to fetch chats",
          err,
        });
      });
  });
}

module.exports = chatFetch;
