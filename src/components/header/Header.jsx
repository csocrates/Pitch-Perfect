import React from "react";
import "./Header.css";
import "../../App.css";
import tentIcon from "../../Images/tent-icon.png";
import { Link } from "@reach/router";
import LoginPage from "../login/LoginPage";
import WelcomePanel from "../login/WelcomePanel";

const Header = ({ setUser, username }) => {
  return (
    <>
      <section className="App__Header">
        {username ? (
          <WelcomePanel setUser={setUser} username={username} />
        ) : (
          <LoginPage setUser={setUser} username={username} />
        )}
        <Link to="/">
          <h2 className="App__HeaderTitle">
            Pitch Perfect
            <img className="header__tentIcon" src={tentIcon} alt="" />
          </h2>
        </Link>
      </section>
    </>
  );
};

export default Header;
