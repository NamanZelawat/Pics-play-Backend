const gitHubApi = require("./../github");
const saveImg = require("./saveImg");
const uuidv4 = require("uuid/v4");

function profileImgUpdate(username, file) {
  var filename = username + "/" + uuidv4() + ".png";
  var repo = gitHubApi.getRepo(process.env.USERNAME, process.env.REPOSITORY);

  return new Promise((resolve, reject) => {
    repo
      .writeFile(
        "master",
        filename,
        file.buffer,
        "A file",
        { encode: true },
        function (err, data) {
          if (err) {
          } else {
            saveImg(username, data.content._links.html)
              .then(function (data) {
                return resolve(data);
              })
              .catch(function (err) {
                return reject(err);
              });
          }
        }
      )
      .then(function (data) {})
      .catch(function (err) {
        return reject({
          success: false,
          msg: "Error in uploading",
          err,
        });
      });
  });
}

module.exports = profileImgUpdate;
