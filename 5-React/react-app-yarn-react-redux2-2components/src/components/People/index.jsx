import React, { Component } from "react";
import "./index.css";
import { nanoid } from "nanoid";

export default class People extends Component {
  render() {
    return (
      <div className="people">
        <h3>People组件</h3>
        <h4>Counter组件的Sum是：{this.props.sum}</h4>
        <input
          type="text"
          placeholder="Please enter a name"
          ref={(currentNode) => {
            this.name = currentNode;
          }}
        />
        <input
          type="number"
          placeholder="Please enter an age"
          ref={(currentNode) => {
            this.age = currentNode;
          }}
        />
        <button onClick={this.addPerson}>Add</button>
        <ul>
          {this.props.peopleList.people.map((person) => {
            return (
              <li key={person.id}>
                name: {person.name} age: {person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  addPerson = () => {
    if (this.name.value && this.age.value) {
      const newPerson = { id: nanoid(), name: this.name.value, age: this.age.value };
      this.name.value = "";
      this.age.value = "";
      this.props.addPerson(newPerson);
    }
  };
}
