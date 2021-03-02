import React, { Component } from "react";
import SelectOwnerOrUser from "./SelectOwnerOrUser";
import ShowLoginForm from "./showLoginForm";
import LoginForm from "./LoginForm";
import RegisterButton from "./RegisterButton";
import "./login.css";
import "../header/Header.css";

class LoginPage extends Component {
  state = { isUser: true, registered: false, showLoginForm: false };
  render() {
    const { username, setUser } = this.props;
    const { isUser, registered, showLoginForm } = this.state;

    if (!username)
      return (
        <div className="login-container">
          <ShowLoginForm showLogin={this.showLogin} />

          <SelectOwnerOrUser
            toggleForm={this.changeOwnerOrUser}
            isUser={isUser}
            showLogin={this.state.showLoginForm}
          />
          <LoginForm
            setUser={setUser}
            isUser={isUser}
            showLoginForm={showLoginForm}
            registered={registered}
          />
          {showLoginForm ? (
            <RegisterButton
              isUser={isUser}
              toggleForm={this.changeOwnerOrUser}
              registered={registered}
              setAsRegistered={this.setAsRegistered}
            />
          ) : null}
        </div>
      );
  }
  changeOwnerOrUser = () => {
    this.setState((currentState) => {
      return { isUser: !currentState.isUser };
    });
  };
  showLogin = () => {
    this.setState((currentState) => {
      return { showLoginForm: !currentState.showLoginForm };
    });
  };
  setAsRegistered = () => {
    this.setState({ registered: true });
  };
}

export default LoginPage;
