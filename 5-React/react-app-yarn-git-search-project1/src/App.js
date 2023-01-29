import React, { Component } from 'react'
import './App.css';
import SearchArea from './components/SearchArea'
import UserList from './components/UserList';
import axios from "axios";


class App extends Component {
  state = {
    users: [],
    isFirstLoad: true,
    isLoading: false,
    err: ''
  };

  render() {
    return (
      <div className='app'>
        <SearchArea getUsers={this.getUsers} />
        <UserList {...this.state} />
      </div>
    );
  }

  getUsers = (searchInputValue) => {
    this.setState({ isFirstLoad: false })
    this.setState({ isLoading: true })
    axios.get(`https://api.github.com/search/users?q=${searchInputValue}`).then(
      (response) => {
        this.setState({ users: response.data.items });
        this.setState({ isLoading: false })
      },
      (error) => {
        console.log("error:" + error);
        this.setState({ err: error.message })
        this.setState({ isLoading: false })
      },
    )
  }

}

export default App;
