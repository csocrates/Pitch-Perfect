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
      .checkPasword(userData)
      .then(() => {
        setUser(username, "user");
      })
      .catch((err) => {
        console.dir(err);
        // this.setState({ errorMsg: });
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
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleInput}
        />
        {errorMsg ? <p>{errorMsg}</p> : <p></p>}
        <button onClick={this.handleSubmit}>Log in</button>
      </form>
    ) : null;
  }
}

export default LoginForm;
