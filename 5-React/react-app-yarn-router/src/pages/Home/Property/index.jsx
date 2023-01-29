import React, { Component } from "react";
import PropertyDetails from "./ProtertyDetails";
import MyNavLink from "../../../MyNavLink";
import { Route } from "react-router-dom";

export default class Property extends Component {
  state = {
    properties: [
      { id: 1, name: "Blenheim Palace", location: "Oxfordshire" },
      { id: 2, name: "Highclere Castle", location: "West Berkshire" },
      { id: 3, name: "Chatsworth", location: "Derbyshire" },
    ],
  };
  render() {
    const { properties } = this.state;
    return (
      <div>
        <h5>展示的是Property页面</h5>
        <ul>
          {properties.map((property) => {
            return (
              <li key={property.id}>
                {/*下面to裡面的內容，帶有花括號的一段，表示向路由組件傳遞params參數。 MyNavLink是我自己封裝的NavLink。 */}
                <MyNavLink to={`/home/property/details/${property.id}/${property.name}/${property.location}`}>{property.name}</MyNavLink>
                <button
                  onClick={() => {
                    this.pushShow(property.id, property.name, property.location);
                  }}
                >
                  push跳轉查看property詳情
                </button>
                <button
                  onClick={() => {
                    this.replaceShow(property.id, property.name, property.location);
                  }}
                >
                  replace跳轉查看property詳情
                </button>
              </li>
            );
          })}
        </ul>
        <h5>Property Details</h5>
        {/* 聲明接收params參數 */}
        <Route path="/home/property/details/:id/:name/:location" component={PropertyDetails} />
      </div>
    );
  }
  pushShow = (id, name, location) => {
    // push跳轉+params攜帶參數
    this.props.history.push(`/home/property/details/${id}/${name}/${location}`);
  };
  replaceShow = (id, name, location) => {
    // replace跳轉+params攜帶參數
    this.props.history.replace(`/home/property/details/${id}/${name}/${location}`);
  };
}
