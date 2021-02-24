import React from "react";
import Carousel from "react-bootstrap/Carousel";

function SingleCampsiteIntro(props) {
  console.dir(props);
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Address: {props.formatted_address}</p>
      <p>Contact: {props.formatted_phone_number}</p>
      <p>Rating: {props.rating}</p>
      {/* props.photos https://splidejs.com/ */}
      <Carousel>
        {props.photos.map((photo) => (
          <Carousel.Item>
            <img className="d-block w-100" src={photo.getUrl()} alt="slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SingleCampsiteIntro;
