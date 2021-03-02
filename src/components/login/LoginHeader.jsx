import React from "react";

const LoginHeader = ({ isUser, showLogin }) => {
  return (
    <div>
      {showLogin ? isUser ? <h4>User Log In</h4> : <h4>Owner Log In</h4> : null}
    </div>
  );
};

export default LoginHeader;
