import React, { Component } from "react";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeatPassword: "",
    firstNameError: false,
    lastNameError: false,
    usernameError: false,
    passwordError: false,
    repeatPasswordError: false,
  };

  handleInput = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  validate = () => {
    const {
      firstName,
      lastName,
      username,
      password,
      repeatPassword,
    } = this.state;
    if (firstName.length < 3) {
      this.setState({ firstNameError: true });
      return false;
    } else {
      this.setState({ firstNameError: false });
    }
    if (lastName.length < 2) {
      this.setState({ lastNameError: true });
      return false;
    } else {
      this.setState({ lastNameError: false });
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
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log("post request");
    }
  };

  render() {
    const { isUser, showForm } = this.props;
    const {
      firstName,
      lastName,
      username,
      password,
      repeatPassword,
    } = this.state;
    return showForm ? (
      <form>
        <label>
          First Name:
          <input type="text" id="firstName" value={firstName} />
        </label>
        <label>
          Last Name:
          <input type="text" id="lastName" value={lastName} />
        </label>
        <label>
          Choose a username:
          <input type="text" id="username" value={username} />
          {/* onblur (if not empty) - api check to see if username is taken then render message */}
          <p></p>
        </label>
        <label>
          Choose a password:
          <input type="password" id="password" value={password} />
        </label>
        <label>
          Repeat your password:
          <input type="password" id="repeatPassword" value={repeatPassword} />
        </label>
        <button
          disabled={!this.state.isValid}
          onClick={
            isUser
              ? () => {
                  "post request to user table";
                }
              : () => {
                  "post request to owner table";
                }
          }
        >
          Create Profile
        </button>
      </form>
    ) : null;
  }
}

export default RegisterForm;
