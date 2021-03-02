import React from "react";
import walkingIcon from "../../Images/walking-icon.webp";
import roadIcon from "../../Images/road-icon.png";
import "./POIBoard.css";

const NearestCard = ({ type, name, distance, onFoot, icon }) => {
  return (
    <section className={`nearest${type}Card`}>
      <img className="nearestIcon" src={icon} alt={type} />

      <p className="name">{name}</p>

      <p className="distance">
        <img
          src={roadIcon}
          alt="distance"
          style={{ width: "20px", height: "auto" }}
        />
        {distance}
      </p>

      <div className="walking-time">
        <img
          src={walkingIcon}
          alt="On Foot"
          style={{ width: "30px", height: "auto" }}
        />
        {onFoot}
      </div>
    </section>
  );
};

export default NearestCard;
