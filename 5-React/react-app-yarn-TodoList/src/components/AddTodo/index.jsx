import React, { Component } from "react";
import "./index.css";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

class AddTodo extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="get-todo">
        <input type="text" placeholder="请输入任务名称，然后回车确认" onKeyUp={this.handleKeyUp} />
      </div>
    );
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      const newTodo = { id: nanoid(), content: e.target.value, done: false };
      e.target.value = "";
      this.props.addTodo(newTodo);
    } else {
      return;
    }
  };
}

export default AddTodo;
