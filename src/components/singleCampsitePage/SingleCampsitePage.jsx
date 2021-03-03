import React from "react";
import { Router } from "@reach/router";
import SingleCampsiteInfo from "./SingleCampsiteInfo";
import CampsitesSearchANDResults from "../campsites-page/CampsitesSearchANDResults";

const SingleCampsitePage = (props) => {
  return (
    <>
      <CampsitesSearchANDResults changeMap={props.changeMap} map={props.map} />
      <Router>
        <SingleCampsiteInfo path="/:place_id" map={props.map} />
      </Router>
    </>
  );
};

export default SingleCampsitePage;
