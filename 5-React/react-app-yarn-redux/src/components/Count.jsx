import React, { Component } from "react";
import "./Count.css";
import store, { thunkFunctionCreator } from "../redux/store";
import { incremented, decremented, oddIncremented, addAsync } from "../redux/counterSlice";

class Count extends Component {
  // redux只負責管理狀態。每次頁面更新後，如果用store.subscribe()去監聽store，只要store狀態改變，就調用this.setState({})，傳個空對象進去，“虛晃一槍”，讓React感覺組件狀態“改變”了，然後React調用render渲染頁面，把最新的store數據渲染上頁面。
  componentDidMount() {
    store.subscribe(() => {
      this.setState({});
    });
  }
  render() {
    return (
      <div className="Count">
        <h1>当前和为：{store.getState().sum}</h1>
        <select
          ref={(currentNode) => {
            this.select1 = currentNode;
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increaseN}>+</button>
        <button onClick={this.decreaseN}>-</button>
        <button onClick={this.oddIncreaseN}>如果当前和为奇数，则+</button>
        <button onClick={this.asyncIncreaseN}>异步加</button>
      </div>
    );
  }

  increaseN = () => {
    const selectedValue = parseInt(this.select1.value);
    store.dispatch(incremented(selectedValue));
  };

  decreaseN = () => {
    const selectedValue = parseInt(this.select1.value);
    store.dispatch(decremented(selectedValue));
  };

  oddIncreaseN = () => {
    const { sum } = store.getState();
    if (sum % 2 !== 0) {
      const selectedValue = parseInt(this.select1.value);
      store.dispatch(oddIncremented(selectedValue));
    }
  };

  asyncIncreaseN = () => {
    const selectedValue = parseInt(this.select1.value);
    // setTimeout(() => {
    //   store.dispatch(asyncIncremented(selectedValue));
    // }, 500);
    // store.dispatch(thunkFunctionCreator(incremented, selectedValue, 99));
    store.dispatch(addAsync(selectedValue));
  };
}

export default Count;
