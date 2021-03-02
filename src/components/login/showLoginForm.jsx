import React from "react";
import loginIcon from "../../Images/login-icon.jpg";
import "../header/Header.css";

const showLoginForm = ({ showLogin }) => {
  return (
    <div>
      <button onClick={showLogin} className="header__login-button">
        <img
          style={{ width: "30px", height: "auto" }}
          src={loginIcon}
          alt="login"
        />
      </button>
    </div>
  );
};

export default showLoginForm;
