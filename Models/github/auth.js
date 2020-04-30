var GitHubApi = require("github-api");
const dotenv = require("dotenv");
dotenv.config();

var gitHubApi = new GitHubApi({
  token: process.env.GITHUB_TOKEN,
});

module.exports = gitHubApi;
