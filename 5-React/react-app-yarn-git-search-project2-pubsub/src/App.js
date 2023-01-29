import React, { Component } from 'react'
import './App.css';
import SearchArea from './components/SearchArea'
import UserList from './components/UserList';


class App extends Component {

  render() {
    return (
      <div className='app'>
        <SearchArea />
        <UserList />
      </div>
    );
  }

}

export default App;
