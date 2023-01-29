import React, { Component } from "react";
import "./index.css";
import Todo from "./components/Todo";
import PropTypes from "prop-types";

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    changeCheck: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    showFlag: PropTypes.string.isRequired,
  };

  render() {
    const { changeCheck, del } = this.props;

    return (
      <div className="todo-list">
        {this.todosToBeShown().length === 0
          ? "当前无事项"
          : this.todosToBeShown().map((todo) => {
              return <Todo key={todo.id} todo={todo} changeCheck={changeCheck} del={del} />;
            })}
      </div>
    );
  }

  todosToBeShown = () => {
    const { showFlag } = this.props;
    if (showFlag === "ALL") {
      return this.props.todos;
    } else {
      return this.props.todos.filter((todo) => {
        if (todo.done) {
          return false;
        } else {
          return true;
        }
      });
    }
  };
}

export default TodoList;
