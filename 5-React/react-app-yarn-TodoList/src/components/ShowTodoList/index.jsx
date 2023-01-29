import React, { Component } from "react";
import "./index.css";
import PropTypes from "prop-types";

class ShowTodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    handleClickCheckall: PropTypes.func.isRequired,
    delFinishedTasks: PropTypes.func.isRequired,
    changeShowTodosFlag: PropTypes.func.isRequired,
    showFlag: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="show-todo-list">
        <div className="choice-wrap">
          <input type="checkbox" className="checkAll" ref={this.getCheckAllInput} onChange={this.handleClickCheckall} />
          <span className={this.props.showFlag === "ALL" ? "choice TodosShown" : "choice"} onClick={this.showAllTasks}>
            全部任务
          </span>
          <span className="divider">|</span>
          <span className={this.props.showFlag === "ALL" ? "choice" : "choice TodosShown"} onClick={this.showFinishedTasks}>
            未完成任务
          </span>
        </div>
        {this.calCheckdTodos().length === 0 ? (
          ""
        ) : (
          <button className="del-btn" onClick={this.delFinishedTasks}>
            清除已完成任务
          </button>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.checkAll();
  }

  componentDidUpdate() {
    this.checkAll();
  }

  // 获取选择所有的checkbox的ref
  getCheckAllInput = (currentNode) => {
    this.checkAllInput = currentNode;
  };

  checkAll = () => {
    const { todos } = this.props;
    const checkedTodos = this.calCheckdTodos();
    if ((checkedTodos.length === todos.length) & (checkedTodos.length !== 0)) {
      this.checkAllInput.checked = true;
    } else {
      this.checkAllInput.checked = false;
    }
  };

  calCheckdTodos = () => {
    return this.props.todos.filter((todo) => {
      if (todo.done) {
        return true;
      } else {
        return false;
      }
    });
  };

  handleClickCheckall = (e) => {
    this.props.handleClickCheckall(e.target.checked);
  };

  delFinishedTasks = () => {
    if (window.confirm("确定删除吗？")) {
      const newTodos = this.props.todos.filter((todo) => {
        if (!todo.done) {
          return true;
        } else {
          return false;
        }
      });
      this.props.delFinishedTasks(newTodos);
    }
  };

  showAllTasks = () => {
    this.props.changeShowTodosFlag("ALL");
  };

  showFinishedTasks = () => {
    this.props.changeShowTodosFlag("UNDONE");
  };
}

export default ShowTodoList;
