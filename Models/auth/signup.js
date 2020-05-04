const dbase = require("./../../Schemas/userSchema");
const email = require("./email");
const uuidv4 = require("uuid/v4");

function signup(body) {
  var otp = uuidv4();
  return new Promise((resolve, reject) => {
    dbase
      .updateOne(
        {
          $or: [{ username: body.username }, { email: body.email }],
        },
        {
          $setOnInsert: {
            username: body.username,
            email: body.email,
            password: body.password,
            otp: otp,
            verified: false,
            profileImg:
              "https://user-images.githubusercontent.com/44704257/80727830-d44aa780-8b23-11ea-8c7d-934804c08d5d.png",
            bio: "Pics-play is awesome.",
            friends: [],
            pending: [],
            posts: [],
          },
        },
        { upsert: true }
      )
      .then(function (data) {
        if (data.upserted != undefined) {
          email(body.email, otp)
            .then(function (data) {
              resolve({
                success: true,
              });
            })
            .catch(function (err) {
              reject({
                success: false,
                msg: "Verification email cannot be sent.",
              });
            });
        } else {
          reject({
            success: false,
            msg: "Username or email already exists",
          });
        }
      })
      .catch(function (err) {
        reject({
          success: false,
          msg: "Server not responding",
          err,
        });
      });
  });
}

module.exports = signup;
