import React from "react";
import { Link } from "@reach/router";

const WelcomePanel = ({ username, setUser }) => {
  return (
    <>
      <p>
        Welcome back
        <Link to={`/users/${username}`}> {username}</Link>
      </p>
      <button
        onClick={() => {
          setUser("");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default WelcomePanel;
