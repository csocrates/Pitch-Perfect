import React from "react";
import loginIcon from "../../Images/login-icon2.png";
import "../header/Header.css";
import { PeopleIcon } from "@primer/octicons-react";

const showLoginForm = ({ showLogin }) => {
  return (
    <div>
      <button onClick={showLogin} className="header__login-button">
        {/* <img
          className="header__login-button-image"
          src={loginIcon}
          alt="login"
        /> */}
        <PeopleIcon size={24} />
      </button>
    </div>
  );
};

export default showLoginForm;
