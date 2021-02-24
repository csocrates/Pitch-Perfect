import React from "react";

function SingleCampsiteIntro(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Address: {props.formatted_address}</p>
      <p>Contact: {props.formatted_phone_number}</p>
      <p>Rating: {props.rating}</p>
      {/* props.photos https://splidejs.com/ */}
    </div>
  );
}

export default SingleCampsiteIntro;
