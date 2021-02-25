import React from "react";
import goose from "../../Images/goose.png";

const CurrentLocationMarker = () => {
  return (
    <div>
      <img className="goose-marker" src={goose} alt="current location" />
    </div>
  );
};

export default CurrentLocationMarker;
