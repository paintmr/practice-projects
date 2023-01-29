import React, { Component } from "react";

export default class PropertyDetails extends Component {
  render() {
    // 在PropertyDetails.jsx中打印所接到的this.props
    console.log(this.props);

    const { id, name, location } = this.props.match.params;

    return (
      <ul>
        <li>id:{id}</li>
        <li>name:{name}</li>
        <li>Location:{location}</li>
      </ul>
    );
  }
}
