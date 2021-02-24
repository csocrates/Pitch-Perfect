import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import CurrentLocationMarker from "../CurrentLocationMarker";
const { REACT_APP_API_KEY } = process.env;

class MapBlock extends Component {
  state = { isLoading: true, zoom: 15, centre: {} };

  componentDidMount() {
    this.setState({ centre: this.props.geoLocation, isLoading: false });
    console.log(this.props);
  }

  render() {
    if (this.state.isLoading) return "Loading";
    return (
      <div style={{ height: "50vh", width: "100%" }}>
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
            lat={this.state.centre.lat}
            lng={this.state.centre.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }

  handleApiLoaded = (map, maps) => {
    this.props.changeMap(map);
  };
}

export default MapBlock;
