import React, { Component } from "react";
import "./index.css";
import PropTypes from "prop-types";

class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    changeCheck: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
  };

  render() {
    const { id, content, done } = this.props.todo;
    return (
      <li className="todo">
        <span className="todo-wrap">
          <input type="checkbox" className="check" checked={done} onChange={this.handleCheck(id)} />
          {content}
        </span>
        <button className="del-btn" onClick={this.handleDel(id)}>
          删除
        </button>
      </li>
    );
  }

  handleCheck = (id) => {
    return (e) => {
      this.props.changeCheck(id, e.target.checked);
    };
  };

  handleDel = (id) => {
    return () => {
      if (window.confirm("确定删除吗？")) {
        this.props.del(id);
      }
    };
  };
}

export default Todo;
