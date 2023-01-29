import React, { Component } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import ShowTodoList from "./ShowTodoList";

class AppWrap extends Component {
  state = {
    todos: [
      { id: 1, content: "CFA", done: true },
      { id: 2, content: "ACCA", done: false },
      { id: 3, content: "Data Science", done: true },
    ],
    showFlag: "ALL",
  };

  render() {
    return (
      <div>
        <AddTodo todos={this.state.todos} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} changeCheck={this.changeCheck} del={this.del} showFlag={this.state.showFlag} />
        <ShowTodoList todos={this.state.todos} handleClickCheckall={this.handleClickCheckall} delFinishedTasks={this.delFinishedTasks} changeShowTodosFlag={this.changeShowTodosFlag} showFlag={this.state.showFlag} />
      </div>
    );
  }

  componentDidMount() {}

  addTodo = (newTodo) => {
    const { todos } = this.state;
    this.setState({ todos: [newTodo, ...todos] });
  };

  changeCheck = (id, checked) => {
    let newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.done = checked;
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };

  del = (id) => {
    let newTodos = this.state.todos.filter((todo) => {
      if (todo.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({ todos: newTodos });
  };

  handleClickCheckall = (doneAll) => {
    const newTodos = this.state.todos.map((todo) => {
      todo.done = doneAll;
      return todo;
    });
    this.setState({ todos: newTodos });
  };

  delFinishedTasks = (newTodos) => {
    this.setState({ todos: newTodos });
  };

  changeShowTodosFlag = (flag) => {
    this.setState({ showFlag: flag });
  };
}

export default AppWrap;
