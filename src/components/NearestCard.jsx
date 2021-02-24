import React from "react";

const NearestCard = ({ type, name, distance }) => {
  return (
    <div>
      Nearest {type}: {name} <br />
      Distance: {distance}
    </div>
  );
};

export default NearestCard;
