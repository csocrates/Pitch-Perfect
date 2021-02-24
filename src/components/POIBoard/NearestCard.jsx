import React from "react";
import walkingIcon from "../../Images/walking-icon.png";
import "./POIBoard.css";

const NearestCard = ({ type, name, distance, onFoot, icon }) => {
  return (
    <div className="nearestCard">
      <p>
        <img
          src={icon}
          alt={type}
          style={{ width: "100px", height: "auto", padding: "10px" }}
        />
        {name}
      </p>
      <p>{distance}</p>
      <p>
        <img
          src={walkingIcon}
          alt="On Foot"
          style={{ width: "60px", height: "auto" }}
        />
        {onFoot}
      </p>
    </div>
  );
};

export default NearestCard;
