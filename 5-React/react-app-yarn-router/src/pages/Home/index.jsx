import React, { Component } from "react";
import Travel from "./Travel";
import Property from "./Property";
import { Route, Switch } from "react-router-dom";
import MyNavLink from "../../MyNavLink";
import "./index.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h5>展示的是Home頁面</h5>
        <div className="home-nav-wrap">
          <div className="home-nav">
            <MyNavLink className="home-nav-item" to="/home/travel">
              去Travel页面
            </MyNavLink>
            <MyNavLink className="home-nav-item" to="/home/property">
              去Property页面
            </MyNavLink>
          </div>
          <div className="home-show">
            <Switch>
              <Route path="/home/travel" component={Travel} />
              <Route path="/home/property" component={Property} />
              <Route path="/" component={Travel} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
