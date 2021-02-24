import React, { Component } from "react";
import * as apis from "../../apis";
import SearchBar from "./SearchBar";
import MapBlock from "./MapBlock";
import CampsiteList from "../campsiteList/CampsiteList";

class CampsitesSearchANDResults extends Component {
  // eslint-disable-next-line no-undef
  state = {
    isLoading: true,
    geoLocation: {},
    searchLocation: "",
    campsiteList: [],
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.setState({ geoLocation: { lat, lng }, isLoading: false });
    });
    if (this.props.map) this.fetchCampsitesByLocation(this.props.map);
  }

  componentDidUpdate(prevProps) {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
    if (!prevProps.map && this.props.map) {
      this.fetchCampsitesByLocation(this.props.map);
    } else if (
      this.props.map &&
      this.props.map.center.lat() !== prevProps.map.center.lat() &&
      this.props.map.center.lng() !== prevProps.map.center.lng()
    ) {
      this.fetchCampsitesByLocation(this.props.map);
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
          campsiteList={this.state.campsiteList}
        />
        <CampsiteList
          isLoading={this.state.isLoading}
          campsiteList={this.state.campsiteList}
        />
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  changeLocation = (searchLocation) => {
    apis
      .fetchGeocode(searchLocation)
      .then((geoLocation) =>
        this.setState({ searchLocation, geoLocation, isLoading: false })
      );
  };

  fetchCampsitesByLocation(map) {
    let campsiteList = [];
    const request = {
      location: map.center,
      query: "campsites",
      radius: "500",
      fields: ["name", "geometry"],
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          campsiteList.push(results[i]);
        }
        this.setState({ isLoading: false, campsiteList });
      }
    });
  }
}

export default CampsitesSearchANDResults;
