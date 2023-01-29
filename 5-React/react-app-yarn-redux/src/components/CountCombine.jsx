import React, { Component } from "react";
import "./CountCombine.css";

class CountCombine extends Component {
  state = {
    sum: 0,
  };
  render() {
    return (
      <div className="CountCombine">
        <h1>当前和为：{this.state.sum}</h1>
        <select
          ref={(currentNode) => {
            this.select1 = currentNode;
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button
          onClick={() => {
            this.handleNumbers("+");
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            this.handleNumbers("-");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            this.handleNumbers("odd");
          }}
        >
          如果当前和为奇数，则+
        </button>
        <button
          onClick={() => {
            this.handleNumbers("async");
          }}
        >
          异步加
        </button>
      </div>
    );
  }

  handleNumbers = (symbol) => {
    const selectedValue = parseInt(this.select1.value);
    const { sum } = this.state;
    if (symbol === "+" || (symbol === "odd" && sum % 2 !== 0)) {
      this.setState({ sum: sum + selectedValue });
    } else if (symbol === "-") {
      this.setState({ sum: sum - selectedValue });
    } else if (symbol === "async") {
      setTimeout(() => {
        this.setState({ sum: sum + selectedValue });
      }, 500);
    }
  };
}

export default CountCombine;
