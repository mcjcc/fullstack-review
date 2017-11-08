const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // call a helper function that takes in github username
  // helper function makes an ajax request to github
  // when request is complete and returns a list of repos from the username, call model.create on each repo in the db
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
