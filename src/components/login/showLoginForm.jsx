import React from "react";
import loginIcon from "../../Images/login-icon.jpg";

const showLoginForm = ({ showLogin }) => {
  return (
    <div>
      <button onClick={showLogin}>
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
