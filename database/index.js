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

let retrieve = (columnName, limit, callback) => {
  // db.repos.find().sort({'repo_stargazers_count': -1}).limit(25);

  var sortByObject = {};

  // -1 means sort by descending
  sortByObject[columnName] = -1;

  Repo.find().sort(sortByObject).limit(limit).select("repo_name owner_name repo_html_url owner_avatar_url repo_stargazers_count").exec(function(error, repos){
    if (error) {callback(error, null);}
    callback(null, repos);
  });

  // var query = Repo.find().sort(sortByObject).limit(limit);
  // query.select("repo_name owner_name repo_stargazers_count");

  // query.exec(function(error, repos){
  //   if (error) { callback(error, null); }
  //   console.log('repos', repos);
  //   callback(null, repos);
  // });
}

let save = (dataArray, callback) => {

  dataArray.forEach(function(repoObject){

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


    var repo = new Repo(toSaveObject);

    repo.save()
      .then(item => {
        callback();
      })
      .catch(error => {
        callback(error);
      });
  });
}

module.exports.retrieve = retrieve;
module.exports.save = save;
