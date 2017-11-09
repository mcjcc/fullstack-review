const express = require('express');

const bodyParser = require('body-parser');
const github = require('../helpers/github');
const database = require('../database');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var searchTerm = req.body.searchTerm;

  // call a helper function that takes in github username
  github.getReposByUsername(searchTerm, function(error, response, body){
    if (error) { throw error; }

    // body is an array of repo json objects
    body.forEach(function(repo){
      database.save(repo, function(error, req, res){
        res.send('record saved!');
      });
    });

  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // access repo model.get(<column name>,<top number of repos to retrieve>)
  // respond with the results
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
