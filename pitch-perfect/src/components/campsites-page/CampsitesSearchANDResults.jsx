import React, { Component } from "react";
import * as apis from "../../apis";

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
    return (
      <div className="campsitepage__CampsitesSearchANDResults">
        <SearchBar />
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
