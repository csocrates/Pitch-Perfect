import React from "react";

const RegisterHeader = ({ isUser }) => {
  return (
    <div>
      {isUser ? <h4>User Registration</h4> : <h4>Owner Registration</h4>}
    </div>
  );
};

export default RegisterHeader;
