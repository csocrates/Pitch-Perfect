import React from "react";
import walkingIcon from "../../Images/walking-icon.webp";
import roadIcon from "../../Images/road-icon.png";
import "./POIBoard.css";

const NearestCard = ({ type, name, distance, onFoot, icon }) => {
  return (
    <section className={`nearest${type}Card`}>
      <img className={`nearest${type}Icon`} src={icon} alt={type} />

      <p className={`${type}name`}>{name}</p>

      <p className={`${type}distance`}>
        <img
          src={roadIcon}
          alt="distance"
          style={{ width: "20px", height: "auto" }}
        />
        {distance}
      </p>

      <div className={`${type}walking-time`}>
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
