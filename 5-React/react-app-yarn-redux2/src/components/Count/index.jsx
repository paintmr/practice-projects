import React, { Component } from "react";
import "./index.css";
import store, { incremented, decremented, incrementedOdd, fetchThunkAction } from "../../Redux/store";

export default class Count extends Component {
  // 每次頁面更新，都去看下store裡面是否更新，若有，則通過往state中放入空對象的形式更新下state，以便React自動調用render。
  componentDidMount() {
    store.subscribe(() => {
      this.setState({});
    });
  }

  render() {
    // 從store中取出數據
    const { isFirstLoad, isLoading, error, datafromServer, sum } = store.getState();
    return (
      <div className="Count">
        <h1 className="sum">Sum: {sum}</h1>
        <select
          ref={(currentNode) => {
            this.select1 = currentNode;
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.addIfSumOdd}>sum奇数+</button>
        <button onClick={this.addAsync}>请求服务器</button>
        <div>
          <h3>服务器数据</h3>
          {isFirstLoad
            ? "點擊按鈕請求數據"
            : isLoading
            ? "正在请求数据"
            : error
            ? error
            : datafromServer
            ? datafromServer.map((info) => {
                return <li key={info.id}>{info.login}哈</li>;
              })
            : "返回的数据为空"}
        </div>
      </div>
    );
  }

  add = () => {
    // incremented是1個action，接收的參數屬於action.payload的值
    store.dispatch(incremented(parseInt(this.select1.value)));
  };

  minus = () => {
    store.dispatch(decremented(parseInt(this.select1.value)));
  };

  addIfSumOdd = () => {
    store.dispatch(incrementedOdd(parseInt(this.select1.value)));
  };

  addAsync = () => {
    // fetchThunkAction傳遞的參數【test】在createAsyncThunk的第2個回調函數中可以接到
    // store.dispatch(fetchThunkAction())不論是否傳參，action都要帶括號fetchThunkAction()，否則出錯。
    store.dispatch(fetchThunkAction("【test】"));
  };
}
