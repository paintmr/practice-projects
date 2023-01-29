import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import PubSub from "pubsub-js";

class SearchArea extends Component {
  render() {
    return (
      <div className="search-area-wrap">
        <h1>Search Github Users</h1>
        <div>
          <input type="text" placeholder="Please enter a name" className="inpt" ref={this.saveInput} onKeyUp={this.handleSearchEnter} />
          <button className="btn" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }

  saveInput = (currentElement) => {
    this.searchInput = currentElement;
  };

  handleSearch = () => {
    PubSub.publish("MsgFromSearch", { isFirstLoad: false });
    PubSub.publish("MsgFromSearch", { isLoading: true });
    axios
      .get(`https://api.github.com/search/users?q=${this.searchInput.value}`)
      .then(
        (response) => {
          PubSub.publish("MsgFromSearch", { users: response.data.items });
          // PubSub.publish("MsgFromSearch", { isLoading: false });
        },
        (error) => {
          PubSub.publish("MsgFromSearch", { err: error.message });
          // PubSub.publish("MsgFromSearch", { isLoading: false });
        }
      )
      .finally(() => {
        PubSub.publish("MsgFromSearch", { isLoading: false });
      });
    this.searchInput.value = "";
  };

  handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };
}

export default SearchArea;
