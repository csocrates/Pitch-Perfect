import React from "react";
import { Router } from "@reach/router";
import SingleCampsiteInfo from "./SingleCampsiteInfo";

const SingleCampsitePage = (props) => {
  return (
    <Router>
      <SingleCampsiteInfo path="/:place_id" map={props.map} />
    </Router>
  );
};

export default SingleCampsitePage;
