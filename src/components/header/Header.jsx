import React from "react";
import "./Header.css";
import "../../App.css";
import goose from "../../Images/goose.png";
import { Link } from "@reach/router";

const Header = ({ profilePicture = "../Images/goose.jpg" }) => {
  return (
    <main className="App__Header">
      <Link to="/">
        <h1 className="App__HeaderTitle">Pitch Perfect</h1>
      </Link>
      <img className="App__HeaderProfilePic" src={goose} alt="profile"></img>
    </main>
  );
};

export default Header;
