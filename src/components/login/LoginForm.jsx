import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
import * as api from "../../apis";
import "./login.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
  };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isUser, setUser } = this.props;
    const { username, password } = this.state;
    const userData = { username, password, isUser };
    api
      .checkPassword(userData)
      .then(() => {
        setUser(username, "user");
      })
      .catch((err) => {
        const errorMsg = err.response.data.msg;
        this.setState({ errorMsg });
      });
  };

  render() {
    const { isUser, showLoginForm } = this.props;
    const { username, password, errorMsg } = this.state;
    return showLoginForm ? (
      <form>
        <LoginHeader isUser={isUser} showLogin={showLoginForm} />
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.handleInput}
          className="login-input"
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleInput}
          className="login-input"
        />
        {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : <p></p>}
        <button className="login-button" onClick={this.handleSubmit}>
          Log in
        </button>
      </form>
    ) : null;
  }
}

export default LoginForm;
