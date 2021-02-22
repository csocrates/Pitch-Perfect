import React, { Component } from "react";
import { Router } from "@reach/router";
import CampsitesSearchANDResults from "./CampsitesSearchANDResults";

class CampsitesPage extends Component {
  state = { map: "", isLoading: false };
  render() {
    if (this.isLoading) return "Loading";
    return (
      <div className="App__campsitespage">
        <Router>
          <CampsitesSearchANDResults path="/" />
        </Router>
      </div>
    );
  }
  changeMap = (newMap) => {
    this.setState({ map: newMap, isLoading: false });
  };
}

export default CampsitesPage;
