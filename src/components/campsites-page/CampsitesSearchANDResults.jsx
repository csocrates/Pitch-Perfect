import React, { Component } from "react";
import * as apis from "../../apis";
import CampsiteList from "../CampsiteCard";

class CampsitesSearchANDResults extends Component {
  // eslint-disable-next-line no-undef
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
        {/* <SearchBar /> */}
        <CampsiteList map={this.props.map} />
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  changeLocation = (searchLocation) => {
    apis
      .fetchGeocode(searchLocation)
      .then((geoLocation) => this.setState({ searchLocation, geoLocation }));
  };
}

export default CampsitesSearchANDResults;
