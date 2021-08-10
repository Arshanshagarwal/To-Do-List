import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../button";
import Icon from "../icon";
// import { button } from "react-bootstrap";

import "./task-item.css";

export class TaskItem extends Component {
  constructor() {
    super(...arguments);

    this.state = { editingtitle: false, editingsub: false };

    this.edit = this.edit.bind(this);
    this.editsub = this.editsub.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyUpsub = this.handleKeyUpsub.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.saveSubtitle = this.saveSubtitle.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.stopEditingSub = this.stopEditingSub.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({ editingtitle: true });
  }
  editsub() {
    this.setState({ editingsub: true });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    } else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  handleKeyUpsub(event) {
    if (event.keyCode === 13) {
      this.saveSubtitle(event);
    } else if (event.keyCode === 27) {
      this.stopEditingSub();
    }
  }

  remove() {
    this.props.removeTask(this.props.task);
  }

  save(event) {
    if (this.state.editingtitle) {
      const { task } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== task.title) {
        this.props.updateTask(task, { title });
      }

      this.stopEditing();
    }
  }

  saveSubtitle(event) {
    if (this.state.editingsub) {
      const { task } = this.props;
      const subtitle = event.target.value.trim();
      console.log(task.subtitle);
      console.log(subtitle);

      if (subtitle.length && subtitle !== task.subtitle) {
        this.props.updateTask(task, { subtitle });
      }

      this.stopEditingSub();
    }
  }

  stopEditing() {
    this.setState({ editingtitle: false });
  }
  stopEditingSub() {
    this.setState({ editingsub: false });
  }

  toggleStatus() {
    const { task } = this.props;
    this.props.updateTask(task, { completed: !task.completed });
  }

  renderTitle(task) {
    return (
      <div className="task-item__title" tabIndex="0">
        {task.title}
      </div>
    );
  }

  renderDate(task) {
    return (
      <div className="date-time" tabIndex="0">
        {task.date}
      </div>
    );
  }

  renderSubTitle(task) {
    return (
      <div className="subtask-item__title" tabIndex="0">
        {task.subtitle}
      </div>
    );
  }

  renderTitleInput(task) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="task-item__input"
        defaultValue={task.title}
        onKeyUp={this.handleKeyUp}
        type="text"
      />
    );
  }

  renderSubTitleInput(task) {
    return (
      <input
        // autoComplete="off"
        // autoFocus
        className="subtask-item__input"
        defaultValue={task.subtitle}
        onKeyUp={this.handleKeyUpsub}
        type="text"
      />
    );
  }

  render() {
    const { editingsub, editingtitle } = this.state;
    const { task } = this.props;

    let containerClasses = classNames("task-item", {
      "task-item--completed": task.completed,
      "task-item--editing": editingtitle,
    });

    return (
      <div>
        <div className={containerClasses} tabIndex="0">
          <div className="cell">
            <Button
              className={classNames("btn--icon", "task-item__button", {
                active: task.completed,
                hide: editingtitle,
              })}
              onClick={this.toggleStatus}
            >
              <Icon name="done" />
            </Button>
          </div>

          <div className="cell title-cell">
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href={"#" + task.key}
            >
              {editingtitle
                ? this.renderTitleInput(task)
                : this.renderTitle(task)}
            </a>
          </div>

          <div className="cell">
            <Button
              className={classNames("btn--icon", "task-item__button", {
                hide: editingtitle,
              })}
              onClick={this.edit}
            >
              <Icon name="mode_edit" />
            </Button>
            <Button
              className={classNames("btn--icon", "task-item__button", {
                hide: !editingtitle,
              })}
              onClick={this.stopEditing}
            >
              <Icon name="clear" />
            </Button>
            <Button
              className={classNames("btn--icon", "task-item__button", {
                hide: editingtitle,
              })}
              onClick={this.remove}
            >
              <Icon name="delete" />
            </Button>
            {this.renderDate(task)}
          </div>
        </div>
        <div className="subtask">
          <div
            id={task.key}
            class="panel-collapse collapse"
            className="collapsing"
          >
            <div class="panel-body">
              {editingsub
                ? this.renderSubTitleInput(task)
                : this.renderSubTitle(task)}
              <Button
                className={classNames(
                  "btn--icon",
                  "task-item__button",
                  "subtask-btn",
                  {
                    hide: editingsub,
                  }
                )}
                onClick={this.editsub}
              >
                <Icon name="mode_edit" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskItem;
