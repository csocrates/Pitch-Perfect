import React from "react";

const showLoginForm = ({ showLogin }) => {
  return (
    <div>
      <button onClick={showLogin}>Login</button>
    </div>
  );
};

export default showLoginForm;
