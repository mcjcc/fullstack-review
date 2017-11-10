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

  componentDidMount () {
    console.log('componentDidMount - this: ', this);
    this.retrieveRepos();
    this.setState({

    });
  }

  onRetrieve(reposData) {
    this.setState({
      repos: reposData
    });
  }

  retrieveRepos () {
    console.log('inside retrieveRepos');
    var onRetrieve = this.onRetrieve.bind(this);
    $.ajax({
      url: '/repos',
      type: 'GET',
      contentType: 'application/json',
    }).done(function(data, textStatus){
      console.log('retrieval from db complete! here is the data:', data);
      onRetrieve(data);
    }).fail(function(textStatus, error){
      if (error) { console.error(error); }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    // this function takes in a search term
    // calls an ajax request to send post to server
    var retrieveRepos = this.retrieveRepos.bind(this);
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: term})
    }).done(function(data, textStatus){
      console.log('search complete ', textStatus);
      console.log('search complete', data);
      retrieveRepos();
    }).fail(function(textStatus, error){
      if (error) { console.error(error); }
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
