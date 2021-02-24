import React from "react";
import "./SingleCampsiteIntro.css";
import {
  HomeFillIcon,
  CodeReviewIcon,
  ThumbsupIcon,
} from "@primer/octicons-react";
import Carousel from "react-bootstrap/Carousel";

function SingleCampsiteIntro(props) {
  return (
    <div className="SingleCampsiteIntro">
      <h2 className="SingleCampsiteIntro__name">{props.name}</h2>
      <p className="SingleCampsiteIntro__address">
        <HomeFillIcon size={20} />: {props.formatted_address}
      </p>
      <p className="SingleCampsiteIntro__contact">
        <CodeReviewIcon size={20} />: {props.formatted_phone_number}
      </p>
      <p className="SingleCampsiteIntro__rating">
        <ThumbsupIcon size={20} />: {props.rating}
      </p>

      <Carousel className="SingleCampsiteIntro__photos">
        {props.photos.map((photo) => (
          <Carousel.Item>
            <img
              className="d-block w-100 SingleCampsiteIntro__photos__photo"
              src={photo.getUrl()}
              alt="slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SingleCampsiteIntro;
