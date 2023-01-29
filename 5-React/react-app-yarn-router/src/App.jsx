import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyNavLink from "./MyNavLink";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Router Demo</h1>
        <div className="nav-wrap">
          <nav className="nav">
            {/* 自己封裝的NavLink */}
            <MyNavLink to="/home">去Home頁面</MyNavLink>
            <MyNavLink to="/about">去About頁面</MyNavLink>
          </nav>
          <div className="show">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              {/* 有Switch包裹，把根目錄放在最後 */}
              <Route path="/" exact component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
