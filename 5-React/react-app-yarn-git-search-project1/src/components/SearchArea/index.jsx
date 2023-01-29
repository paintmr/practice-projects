import React, { Component } from "react";
import "./index.css";

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
    this.props.getUsers(this.searchInput.value);
    this.searchInput.value = "";
  };

  handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };
}

export default SearchArea;
