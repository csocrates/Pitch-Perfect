import React from "react";

const SelectOwnerOrUser = ({ isUser, toggleForm, showLogin }) => {
  return showLogin ? (
    isUser ? (
      <button className="userOrOwnerButton" onClick={toggleForm}>
        Switch to Owner
      </button>
    ) : (
      <button className="userOrOwnerButton" onClick={toggleForm}>
        Switch to User
      </button>
    )
  ) : null;
};

export default SelectOwnerOrUser;
