import React, { Component } from "react";

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
    return <div className="campsitepage__CampsitesSearchANDResults"></div>;
  }
  changeLocation = (searchLocation) => {
    this.setState({ searchLocation });
  };
}

export default CampsitesSearchANDResults;
