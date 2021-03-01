import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    const { isUser, showLoginForm } = this.props;
    return (
      showLoginForm && (
        <form>
          <label>
            Username:
            <input type="text" />
          </label>
          <label>
            <input type="password" />
          </label>
          <button
            onClick={
              isUser
                ? () => {
                    "checkUser";
                  }
                : () => {
                    "checkOwner";
                  }
            }
          >
            Log in
          </button>
        </form>
      )
    );
  }
}

export default LoginForm;
