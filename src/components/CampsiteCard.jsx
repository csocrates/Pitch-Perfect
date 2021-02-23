import React from "react";
import { Link } from "@reach/router";

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
      {/* <img
        className="campsite-img"
        src={campsite.photos[0].getUrl()}
        alt="lovely campsite"
      /> */}
    </section>
  );
};

export default campsiteCard;
