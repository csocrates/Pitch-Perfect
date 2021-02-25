import React, { Component } from "react";
import * as apis from "../../apis";
import SearchBar from "./SearchBar";
import MapBlock from "./MapBlock";
import CampsiteList from "../campsiteList/CampsiteList";
import "./CampsitesSearchANDResults.css";

class CampsitesSearchANDResults extends Component {
  // eslint-disable-next-line no-undef
  state = {
    isLoading: true,
    geoLocation: {},
    searchLocation: "",
    campsiteList: [],
    placeholder: "Enter place or postcode"
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
    const { placeholder } = this.state;
    if (this.state.isLoading) return "Loading";
    return (
      <div className="campsitepage__CampsitesSearchANDResults">
        <section className="CampsitesSearchANDResults__search">
          <SearchBar
            changeLocation={this.changeLocation}
            placeholder={placeholder}
          />
        </section>
        <section className="CampsitesSearchANDResults__map">
          <MapBlock
            geoLocation={this.state.geoLocation}
            changeMap={this.props.changeMap}
            campsiteList={this.state.campsiteList}
          />
        </section>
        <section className="CampsitesSearchANDResults__list">
          <CampsiteList
            isLoading={this.state.isLoading}
            campsiteList={this.state.campsiteList}
          />
        </section>
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  changeLocation = (searchLocation) => {
    apis
      .fetchGeocode(searchLocation)
      .then((geoLocation) =>
        this.setState({
          searchLocation,
          geoLocation,
          isLoading: true,
          placeholder: "Enter place or postcode"
        })
    )
      .catch((err) => {
        let message = null;
        if (err.message === 'Must be in British Isles') {
          message = err.message
        }
        this.setState(() => {
        return {placeholder: message || 'Invalid location -  try again'}
      })
    })
  };

  fetchCampsitesByLocation(map) {
    let campsiteList = [];
    const request = {
      location: map.center,
      query: "campsites",
      radius: 50000,
      fields: ["name", "geometry"],
      strictbounds: true
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          console.log(results.length)
          campsiteList.push(results[i]);
        }
        this.setState({ isLoading: false, campsiteList });
      }
    });
  }
}

export default CampsitesSearchANDResults;
