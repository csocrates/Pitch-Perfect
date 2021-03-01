import React, { Component } from "react";
import * as apis from "../../apis";
import SearchBar from "./SearchBar";
import MapBlock from "./MapBlock";
import CampsiteList from "../campsiteList/CampsiteList";
import "./CampsitesSearchANDResults.css";
import "../../App.css";

class CampsitesSearchANDResults extends Component {
  // eslint-disable-next-line no-undef
  state = {
    isLoading: true,
    geoLocation: {},
    searchLocation: "",
    campsiteList: [],
    isListLoading: true,
    placeholder: "Enter place or postcode",
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("navigate", position, this.state.isLoading);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.setState({ geoLocation: { lat, lng }, isLoading: false }, () => {
        if (this.props.map) this.fetchCampsitesByLocation(this.props.map);
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.isLoading) {
      this.setState({ isLoading: false, isListLoading: true });
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
    const {
      placeholder,
      geoLocation,
      campsiteList,
      isListLoading,
      searchLocation,
    } = this.state;
    if (this.state.isLoading) return "Loading...";
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
            geoLocation={geoLocation}
            changeMap={this.props.changeMap}
            campsiteList={campsiteList}
          />
        </section>
        <section className="CampsitesSearchANDResults__list">
          <CampsiteList
            isListLoading={isListLoading}
            campsiteList={campsiteList}
            searchLocation={searchLocation}
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
          placeholder: "Enter place or postcode",
        })
      )
      .catch((err) => {
        let message = null;
        if (err.message === "Must be in British Isles") {
          message = err.message;
        }
        this.setState(() => {
          return { placeholder: message || "Invalid location -  try again" };
        });
      });
  };

  fetchCampsitesByLocation(map) {
    let campsiteList = [];
    const request = {
      location: map.center,
      query: "campsites",
      radius: 30000,
      fields: ["name", "geometry"],
      strictbounds: true,
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < 10; i++) {
          if (
            window.google.maps.geometry.spherical.computeDistanceBetween(
              results[i].geometry.location,
              map.center
            ) < request.radius
          ) {
            if (!results[i].name.includes("Motorhome")) {
              campsiteList.push(results[i]);
            }
          }
        }
        this.setState({ isListLoading: false, campsiteList });
      }
    });
  }
}

export default CampsitesSearchANDResults;
