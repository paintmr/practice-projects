import React, { Component } from "react";
import "./index.css";
import User from "../User";

class UserList extends Component {
  render() {
    const { users, isLoading, isFirstLoad, err } = this.props;
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
