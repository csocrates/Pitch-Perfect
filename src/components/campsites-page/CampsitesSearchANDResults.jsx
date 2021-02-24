import React, { Component } from "react";
import * as apis from "../../apis";
import SearchBar from "./SearchBar";
import MapBlock from "./MapBlock";
import CampsiteList from "../CampsiteList";

class CampsitesSearchANDResults extends Component {
  state = { isLoading: true, geoLocation: {}, searchLocation: "" };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.setState({ geoLocation: { lat, lng }, isLoading: false });
    });
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.setState(() => {
        return { isLoading: false };
      });
    }
  }

  render() {
    if (this.state.isLoading) return "Loading";

    return (
      <div className="campsitepage__CampsitesSearchANDResults">
        <SearchBar changeLocation={this.changeLocation} />
        <MapBlock
          geoLocation={this.state.geoLocation}
          changeMap={this.props.changeMap}
        />
        <CampsiteList map={this.props.map} />
      </div>
    );
  }

  changeLocation = (searchLocation) => {
    apis
      .fetchGeocode(searchLocation)
      .then((geoLocation) =>
        this.setState({ searchLocation, geoLocation, isLoading: false })
      );
  };
}

export default CampsitesSearchANDResults;
