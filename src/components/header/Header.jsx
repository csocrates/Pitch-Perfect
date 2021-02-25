import React from "react";
import "./Header.css";
import goose from "../../Images/goose.png";

const Header = ({ profilePicture = "../Images/goose.jpg" }) => {
  return (
    <main className="App__Header">
      <h1 className="App__HeaderTitle">Pitch Perfect</h1>
      <img className="App__HeaderProfilePic" src={goose} alt="profile"></img>
    </main>
  );
};

export default Header;
