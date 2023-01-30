import React, { Component } from "react";
import "./index.css";

export default class Counter extends Component {
  render() {
    const { sum, isFirstLoading, isLoading, error, gitHubUsers } = this.props;
    return (
      <div>
        <h3>Counter组件</h3>
        <h4>People组件的人数是：{this.props.peopleNum}</h4>
        <h4>Sum: {sum}</h4>
        <select ref={(currentNode) => (this.select1 = currentNode)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.addIfOdd}>If Sum Odd +</button>
        <button onClick={this.reqServer}>Req Server</button>
        <div>
          <h4>GitHub Users</h4>
          {isFirstLoading
            ? "Click to request data"
            : isLoading
            ? "Requesting"
            : error
            ? error
            : gitHubUsers
            ? gitHubUsers.map((user) => {
                return <li key={user.id}>{user.login}</li>;
              })
            : "No users"}
        </div>
      </div>
    );
  }

  add = () => {
    this.props.add(this.select1.value * 1);
  };

  minus = () => {
    this.props.minus(this.select1.value * 1);
  };

  addIfOdd = () => {
    const { sum } = this.props;
    if (sum % 2 !== 0) {
      this.props.add(this.select1.value * 1);
    }
  };

  reqServer = () => {
    this.props.reqServer();
  };
}
