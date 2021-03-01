import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
class RegisterButton extends Component {
  state = { showRegisterForm: false };
  render() {
    return (
      <>
        <p>
          Don't have an account yet?
          <button onClick={this.displayForm}> Register</button>
        </p>
        <RegisterForm showForm={this.state.showRegisterForm} />
      </>
    );
  }
  displayForm = () => {
    this.setState((currentState) => {
      return { showRegisterForm: !currentState.showRegisterForm };
    });
  };
}

export default RegisterButton;
