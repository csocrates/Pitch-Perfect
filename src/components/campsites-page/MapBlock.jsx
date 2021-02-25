import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrentLocationMarker from "../markers/CurrentLocationMarker";
import Marker from "../markers/Marker";
import "./MapBlock.css";
const { REACT_APP_API_KEY } = process.env;

class MapBlock extends Component {
  // eslint-disable-next-line no-undef
  state = {
    isLoading: true,
    zoom: 10,
    centre: {},
    campsiteList: [],
    isShown: { show: true, shownId: "" },
  };

  componentDidMount() {
    this.setState({ centre: this.props.geoLocation, isLoading: false });
  }

  render() {
    const { campsiteList } = this.props;
    if (this.state.isLoading) return "Loading";
    return (
      <div className="mapblock">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: REACT_APP_API_KEY,
          }}
          defaultCenter={this.state.centre}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <CurrentLocationMarker
            lat={this.props.geoLocation.lat}
            lng={this.props.geoLocation.lng}
          />
          {campsiteList.map((place) => {
            return (
              <Marker
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tent_Flat_Icon_Vector.svg/1024px-Tent_Flat_Icon_Vector.svg.png"
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                key={place.place_id}
                name={place.name}
                isShown={this.state.isShown}
                setIsShown={this.setIsShown}
                id={place.place_id}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  handleApiLoaded = (map, maps) => {
    this.props.changeMap(map);
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

  // eslint-disable-next-line no-undef
  setIsShown = (trueOrFalse, markerId) => {
    this.setState(() => {
      return { isShown: { show: trueOrFalse, shownId: markerId } };
    });
  };
}

export default MapBlock;
