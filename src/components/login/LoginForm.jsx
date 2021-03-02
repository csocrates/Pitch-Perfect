import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
import * as api from "../../apis";
import "./login.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    invalidUsername: false,
    incorrectPassword: false,
  };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isUser, setUser } = this.props;
    const { username, password } = this.state;
    // api
    //   .checkPasword(username, password, isUser)
    //   .then(() => {
    //     setUser(username, "user");
    //   })
    //   .catch((err) => {
    //     this.setState({ incorrectPassword: true });
    //   });
  };

  render() {
    const { isUser, showLoginForm } = this.props;
    const {
      username,
      password,
      invalidUsername,
      incorrectPassword,
    } = this.state;
    console.log(invalidUsername);
    return showLoginForm ? (
      <form>
        <LoginHeader isUser={isUser} showLogin={showLoginForm} />
        ;
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.handleInput}
        />
        {invalidUsername ? (
          <p style={{ color: "red" }}>Username does not exist</p>
        ) : (
          <p></p>
        )}
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleInput}
        />
        {incorrectPassword ? <p>Your password is incorrect</p> : <p></p>}
        <button onClick={this.handleSubmit}>Log in</button>
      </form>
    ) : null;
  }
}

export default LoginForm;
