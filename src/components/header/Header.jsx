import React from "react";
import "./Header.css";
import "../../App.css";
import goose from "../../Images/goose.png";
import { Link } from "@reach/router";
import LoginPage from "../login/LoginPage";
import WelcomePanel from "../login/WelcomePanel";

const Header = ({
  profilePicture = "../Images/goose.jpg",
  setUser,
  username,
}) => {
  return (
    <>
      <section className="App__Header">
        {username ? (
          <WelcomePanel setUser={setUser} username={username} />
        ) : (
          <LoginPage setUser={setUser} username={username} />
        )}
        <Link to="/">
          <h2 className="App__HeaderTitle">Pitch Perfect</h2>
        </Link>
        {/* <img className="App__HeaderProfilePic" src={goose} alt="profile"></img> */}
      </section>
    </>
  );
};

export default Header;
