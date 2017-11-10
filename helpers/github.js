const request = require('request');
if (process.env.NODE_ENV === 'development') {
  const config = require('../config.js');
  var githubToken = config.TOKEN;
} else {
  var githubToken = process.env.GITHUB_API_TOKEN;
}

let getReposByUsername = (searchTerm, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  // To get all public repos from a user:
  // curl -i https://api.github.com/users/octocat/repos

  let options = {
    url: `https://api.github.com/users/${searchTerm}/repos`,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  request(options, function(error, response, body){
    if (error) {
      callback(error, null, null);
    }
    callback(null, response, body);
  });
}

module.exports.getReposByUsername = getReposByUsername;
