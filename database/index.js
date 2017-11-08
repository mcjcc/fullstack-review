const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  owner_name: String,
  owner_id: Number,
  avatar_url: String,
  html_url: String,
  description: String,
  forks_count: Number,
  stargazers_count: Number,
  watchers_count: Number,
  open_issues_count: Number,
  size: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
