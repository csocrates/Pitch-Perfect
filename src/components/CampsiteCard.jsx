import React from "react";
import { Link } from "@reach/router";
import "./campsiteCard.css";

const campsiteCard = ({ campsite }) => {
  return (
    <section className="campsite-card">
      <div className="campsite-info">
        {/* <Link to={`/campsite/${campsite.place_id}`}> */}
        <h3>{campsite.name}</h3>
        {/* </Link> */}
        <p>{campsite.formatted_address}</p>
        <p>{campsite.rating}</p>
      </div>
      <img
        className="campsite-img"
        src={campsite.photos ? campsite.photos[0].getUrl() : null}
        alt="lovely campsite"
      />
    </section>
  );
};

export default campsiteCard;
