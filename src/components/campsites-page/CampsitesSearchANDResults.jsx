import React, { Component } from "react";
import * as apis from "../../apis";
import SearchBar from './SearchBar'

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
  render () {
    return (
      <div className="campsitepage__CampsitesSearchANDResults">
        <SearchBar
          changeLocation={this.changeLocation}
        />
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
