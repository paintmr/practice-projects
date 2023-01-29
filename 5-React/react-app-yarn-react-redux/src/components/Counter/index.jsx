import React, { Component } from "react";
import "./index.css";

export default class Counter extends Component {
  render() {
    const { sum, isFirstLoading, isLoading, error, users } = this.props;
    return (
      <div>
        <h1>Sum: {sum}</h1>
        <select ref={(currentNode) => (this.select1 = currentNode)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.addIfOdd}>If Sum Odd +</button>
        <button onClick={this.getServerData}>Server Data</button>
        <div>
          <h3>Server Data</h3>
          {isFirstLoading
            ? "Please request data"
            : isLoading
            ? "Requesting"
            : error
            ? error
            : users
            ? users.map((user) => {
                return <li key={user.id}>{user.login}</li>;
              })
            : "no users"}
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

  getServerData = async () => {
    this.props.getServerData();
  };
}
