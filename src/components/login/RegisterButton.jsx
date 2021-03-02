import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
class RegisterButton extends Component {
  state = { showRegisterForm: false };
  render() {
    const { isUser, registered, setAsRegistered } = this.props;
    return (
      <>
        {!registered ? (
          <>
            <p>
              Don't have an account yet?
              <button onClick={this.displayForm}> Register</button>
            </p>
            <RegisterForm
              showForm={this.state.showRegisterForm}
              isUser={isUser}
              setAsRegistered={setAsRegistered}
            />
          </>
        ) : (
          <p>Successfully registered!</p>
        )}
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
