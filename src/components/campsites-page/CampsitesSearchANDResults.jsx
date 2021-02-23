import React, { Component } from "react";
import * as apis from "../../apis";
import MapBlock from "./MapBlock";
import CampsiteList from "../CampsiteList";

class CampsitesSearchANDResults extends Component {
  state = { isLoading: true, geoLocation: {}, searchLocation: "" };
  componentDidMount() {
    this.setState({
      geoLocation: {
        lat: 53.483959,
        lng: -2.244644,
      },
      isLoading: false,
    });
  }

  render() {
    console.log("campsitesearchresults", this.props.map);
    if (this.state.isLoading) return "Loading";
    return (
      <div className="campsitepage__CampsitesSearchANDResults">
        {/* <SearchBar /> */}
        <MapBlock
          geoLocation={this.state.geoLocation}
          changeLocation={this.changeLocation}
          changeMap={this.props.changeMap}
        />
        <CampsiteList map={this.props.map} />
      </div>
    );
  }

  changeLocation = (searchLocation) => {
    apis
      .fetchGeocode(searchLocation)
      .then((geoLocation) => this.setState({ searchLocation, geoLocation }));
  };
}

export default CampsitesSearchANDResults;
