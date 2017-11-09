const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongodb');
});

let repoSchema = mongoose.Schema({
  id: Number,
  repo_name: String,
  repo_full_name: String,
  repo_description: String,
  repo_html_url: String,
  repo_forks_count: Number,
  repo_stargazers_count: Number,
  repo_watchers_count: Number,
  repo_open_issues_count: Number,
  repo_size: Number,
  owner_name: String,
  owner_id: Number,
  owner_avatar_url: String,
  owner_html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (req, res, repoObject, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var toSaveObject = {
      id: repoObject.id,
      repo_name: repoObject.name,
      repo_full_name: repoObject.full_name,
      repo_description: repoObject.description,
      repo_html_url: repoObject.html_url,
      repo_forks_count: repoObject.forks_count,
      repo_stargazers_count: repoObject.stargazers_count,
      repo_watchers_count: repoObject.watchers_count,
      repo_open_issues_count: repoObject.open_issues_count,
      repo_size: repoObject.size,
      owner_name: repoObject.owner.login,
      owner_id: repoObject.owner.id,
      owner_avatar_url: repoObject.owner.avatar_url,
      owner_html_url: repoObject.owner.html_url
    };


  var repo = new Repo(repoObject);

  repo.save()
    .then(item => {
      callback(null, req, res);
    })
    .catch(error => {
      callback(error, req, res);
    })

}

module.exports.save = save;
