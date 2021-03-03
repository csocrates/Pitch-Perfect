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
    freeUsernameError: false,
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
    } = this.state;
    if (firstname.length < 2) {
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
    this.checkUsername();

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
      freeUsernameError,
      passwordError,
      repeatPasswordError,
    } = this.state;
    return showForm ? (
      <form className="registration-form">
        <RegisterHeader isUser={isUser} />
        <label className="firstname">
          First Name:
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={this.handleInput}
            className="reg-input"
          />
          {firstNameError ? (
            <p className="form-error">
              First name must be at least two characters
            </p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label className="firstname">
          Last Name:
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={this.handleInput}
            className="reg-input"
          />
          {lastNameError ? (
            <p className="form-error">
              Last name must be at least two characters
            </p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label className="firstname">
          New Username:
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handleInput}
            className="reg-input"
          />
          {usernameError ? (
            <p className="form-error">Invalid Username</p>
          ) : (
            <p></p>
          )}
          {freeUsernameError ? (
            <p className="form-error">Username already exists</p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label className="firstname">
          Choose Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleInput}
            className="reg-input"
          />
          {passwordError ? (
            <p className="form-error">
              Your password must be at least six characters
            </p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <label className="firstname">
          Repeat Password:
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={this.handleInput}
            className="reg-input"
          />
          {repeatPasswordError ? (
            <p className="form-error">Passwords do not match</p>
          ) : (
            <p></p>
          )}
        </label>
        <br />
        <button className="createProfile-button" onClick={this.handleSubmit}>
          Create Profile
        </button>
      </form>
    ) : null;
  }

  checkUsername = () => {
    console.log("STATE", this.state);
    const { isUser } = this.props;
    const { username } = this.state;
    if (isUser) {
      api
        .getUser(username)
        .then((res) => {
          console.log("checkUser", res);
          this.setState({ freeUsernameError: true });
        })
        .catch((err) => {
          console.dir(err);
          if (err.response.data.msg === "No user was found") {
            this.setState({ freeUsernameError: false });
          } else {
            this.setState({ freeUsernameError: true });
          }
        });
    }
    if (!isUser) {
      console.log("get request to owner table");
    }
  };
}

export default RegisterForm;
