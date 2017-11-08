import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // this function takes in a search term
    // calls an ajax request to send post to server
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: term})
    }).then(function(data, textStatus, error){
      if (error) { throw error; }
      console.log('search complete ', textStatus);
    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
