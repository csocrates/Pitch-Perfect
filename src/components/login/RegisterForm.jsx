import React, { Component } from "react";
import RegisterHeader from "./RegisterHeader";
import * as api from "../../apis";
import "./login.css";

class RegisterForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    repeatPassword: "",
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    passwordError: false,
    repeatPasswordError: false,
    freeUsername: true,
    freeUsernameMsg: false,
  };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validate = () => {
    const {
      firstname,
      lastname,
      password,
      repeatPassword,
      username,
      usernameError,
      freeUsername,
    } = this.state;
    if (firstname.length < 3) {
      this.setState({ firstNameError: true });
      return false;
    } else {
      this.setState({ firstNameError: false });
    }
    if (lastname.length < 2) {
      this.setState({ lastNameError: true });
      return false;
    } else {
      this.setState({ lastNameError: false });
    }
    if (username < 3) {
      this.setState({ usernameError: true });
      return false;
    } else {
      this.setState({ usernameError: false });
    }
    if (!freeUsername) {
      return false;
    } else {
      this.setState({ freeUsername: true });
    }
    if (password.length < 6) {
      this.setState({ passwordError: true });
      return false;
    } else {
      this.setState({ passwordError: false });
    }
    if (repeatPassword !== password) {
      this.setState({ repeatPasswordError: true });
      return false;
    } else {
      this.setState({ repeatPasswordError: false });
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isUser, setAsRegistered } = this.props;
    const { firstname, lastname, username, password } = this.state;
    const newUser = { username, firstname, lastname, password };
    const isValid = this.validate();
    if (isValid && isUser) {
      api
        .postUser(newUser)
        .then(() => {
          setAsRegistered();
        })
        .catch((err) => {
          console.dir(err);
        });
    }
    if (isValid && !isUser) {
      console.log("post request to owner table");
      setAsRegistered();
    }
  };

  render() {
    const { isUser, showForm } = this.props;
    const {
      firstname,
      lastname,
      username,
      password,
      repeatPassword,
      firstNameError,
      lastNameError,
      usernameError,
      passwordError,
      repeatPasswordError,
      freeUsername,
      freeUsernameMsg,
    } = this.state;
    return showForm ? (
      <form>
        <RegisterHeader isUser={isUser} />
        <label>
          First Name:
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={this.handleInput}
          />
          {firstNameError ? (
            <p>First name must be at least two characters</p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={this.handleInput}
          />
          {/* {lastNameError ? <p>Come on, we've been over this...</p> : <p></p>} */}
        </label>
        <br />
        <label>
          New username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handleInput}
            onBlur={this.checkUsername}
          />
          {usernameError ? (
            <p style={{ color: "red" }}>
              Username must be at least three characters
            </p>
          ) : (
            <p></p>
          )}
          {!freeUsername ? (
            <p style={{ color: "red" }}>Username already exists</p>
          ) : (
            <p></p>
          )}
          {freeUsernameMsg ? (
            <p style={{ color: "green" }}>Username available</p>
          ) : (
            ""
          )}
        </label>
        <br />
        <label>
          Choose password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleInput}
          />
          {passwordError ? (
            <p>Your password must be at least six characters</p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label>
          Repeat password:
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={this.handleInput}
            onBlur={this.validate}
          />
          {repeatPasswordError ? <p>Passwords do not match</p> : <p></p>}
        </label>
        <br />
        <button onClick={this.handleSubmit}>Create Profile</button>
      </form>
    ) : null;
  }
  checkUsername = () => {
    const { isUser } = this.props;
    const { username } = this.state;
    if (isUser) {
      api
        .getUser(username)
        .then(() => {
          this.setState({ freeUsername: false });
        })
        .catch((err) => {
          if (err.response.data === "No user was found") {
            this.setState({ freeUsername: true, freeUsernameMsg: true });
          }
        });
    }
    if (!isUser) {
      console.log("get request to owner table");
    }
  };
}

export default RegisterForm;
