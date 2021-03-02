import React from "react";
import loginIcon from "../../Images/icon-login.jpg";
import "../header/Header.css";

const showLoginForm = ({ showLogin }) => {
  return (
    <div>
      <button onClick={showLogin} className="header__login-button">
        <img
          className="header__login-button-image"
          src={loginIcon}
          alt="login"
        />
      </button>
    </div>
  );
};

export default showLoginForm;
