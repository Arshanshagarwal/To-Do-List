import React, { Component } from "react";
import PropTypes from "prop-types";

import "./task-form.css";

export class TaskForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super(...arguments);

    this.state = { title: "", subtitle: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({ title: "", subtitle: "" });
  }

  handleChange(event) {
    this.setState({ title: event.target.value, subtitle: event.target.value });
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length) this.props.handleSubmit(title);
    this.clearInput();
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="What needs to be done?"
          type="text"
          value={this.state.title}
        />
      </form>
    );
  }
}

export default TaskForm;
