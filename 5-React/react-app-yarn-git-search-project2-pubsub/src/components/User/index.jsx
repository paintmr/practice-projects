import React, { Component } from "react";
import "./index.css";

class User extends Component {
  render() {
    const { avatar_url, login, html_url } = this.props;
    return (
      <li className="user">
        <a href={html_url} target="_blank" rel="noreferrer">
          <img src={avatar_url} alt="" className="user-avatar" />
          <p className="user-name">{login}</p>
        </a>
      </li>
    );
  }
}

export default User;
