import React from "react";
import { Link, navigate } from "@reach/router";
import "./LinkToHomepage.css";

const LinkToHomepage = () => {
  return (
    <div>
      <Link to="/">
        <button className="homepage-button">Home</button>
      </Link>
    </div>
  );
};

export default LinkToHomepage;
