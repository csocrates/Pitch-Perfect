import React from "react";
import { Link } from "@reach/router";
import "./login.css";
import "../header/Header.css";

const WelcomePanel = ({ username, setUser }) => {
  return (
    <main className="header__welcome">
      <p>
        Welcome back
        <Link to={`/users/${username}`}> {username}</Link>
      </p>
      <button
        className="logout-button"
        onClick={() => {
          setUser("");
        }}
      >
        Logout
      </button>
    </main>
  );
};

export default WelcomePanel;
