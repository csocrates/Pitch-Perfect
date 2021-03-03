import React, { Component } from "react";
import { Router } from "@reach/router";
import CampsitesSearchANDResults from "./CampsitesSearchANDResults";
import SingleCampsitePage from "../singleCampsitePage/SingleCampsitePage";
import PageNotFound from "./PageNotFound";
import ClipLoader from "react-spinners/ClipLoader";
import Userpage from "../userpage/UserPage";

class CampsitesPage extends Component {
  // eslint-disable-next-line no-undef
  state = { map: "", currentSearchLocation: "", isLoading: false };
  render() {
    if (this.state.isLoading) return <ClipLoader />;

    return (
      <div className="App__campsitespage">
        <Router>
          <CampsitesSearchANDResults
            path="/"
            changeMap={this.changeMap}
            map={this.state.map}
          />

          <SingleCampsitePage path="/campsite/*" map={this.state.map} />
          <Userpage path="/users/:username" />
          <PageNotFound default />
        </Router>
      </div>
    );
  }
  // eslint-disable-next-line no-undef
  changeMap = (newMap, newSearchLocation) => {
    this.setState({
      map: newMap,
      isLoading: false,
    });
  };
}

export default CampsitesPage;
