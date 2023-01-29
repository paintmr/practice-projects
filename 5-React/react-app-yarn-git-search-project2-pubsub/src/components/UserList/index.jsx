import React, { Component } from "react";
import "./index.css";
import User from "../User";
import PubSub from "pubsub-js";

class UserList extends Component {
  state = {
    users: [],
    isFirstLoad: true,
    isLoading: false,
    err: "",
  };

  componentDidMount() {
    this.token = PubSub.subscribe("MsgFromSearch", (msg, data) => {
      this.setState(data);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users, isLoading, isFirstLoad, err } = this.state;
    return (
      <div className="user-list">
        {/* 三元運算符可連續使用。下面的實例代碼意思：isFirstLoad？是否為頁面首次加載，isLoading ？是否正在向服務器請求數據，err？請求數據是否出錯，users中是否有數據？ */}
        {isFirstLoad ? (
          "Enter name to search."
        ) : isLoading ? (
          "Getting data..."
        ) : err !== "" ? (
          err
        ) : users.length > 0 ? (
          <div>
            <h1 className="ul-title">UserList</h1>
            <ul className="users">
              {users.map((user) => {
                return <User key={user.id} {...user} />;
              })}
            </ul>
          </div>
        ) : (
          "No users match. Enter English letters and numbers to search for login names."
        )}
      </div>
    );
  }
}

export default UserList;
