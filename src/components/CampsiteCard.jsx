import React from "react";
import "./campsiteCard.css";
import { Link } from "@reach/router";

const campsiteCard = ({ campsite }) => {
  return (
    <section id={campsite.place_id} className="campsite-card">
      <div className="campsite-info">
        <Link to={`/campsite/${campsite.place_id}`}>
          <h3 className="campsite-name">{campsite.name}</h3>
        </Link>
        <p className="campsite-address">{campsite.formatted_address}</p>
        <p className="campsite-rating">{campsite.rating}</p>
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
