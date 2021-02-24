import React, { Component } from "react";
import { Router } from "@reach/router";
import CampsitesSearchANDResults from "./CampsitesSearchANDResults";

class CampsitesPage extends Component {
  // eslint-disable-next-line no-undef
  state = { map: "", isLoading: false };
  render() {
    if (this.isLoading) return "Loading";
    return (
      <div className="App__campsitespage">
        <Router>
          <CampsitesSearchANDResults
            path="/"
            changeMap={this.changeMap}
            map={this.state.map}
          />

          {/* <SingleCampsitePage path="/campsite/:place_id" map={this.state.map} /> */}
        </Router>
      </div>
    );
  }
  // eslint-disable-next-line no-undef
  changeMap = (newMap) => {
    this.setState({ map: newMap, isLoading: false });
  };
}

export default CampsitesPage;
