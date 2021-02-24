import React, { Component } from "react";
import * as api from "../apis";

const location = { lat: 51.443546, lng: -2.61116 };
const origin = location;
const nearestPub = new window.google.maps.LatLng(51.44131, -2.582087);
const nearestSupermarket = new window.google.maps.LatLng(51.442081, -2.578121);

class POIBoard extends Component {
  componentDidMount() {
    this.fetchNearestPlaces("bar", location);
    this.findDistanceBetween(origin, [nearestPub, nearestSupermarket]);
  }

  render() {
    return <div></div>;
  }
  fetchNearestPlaces(type, location) {
    const service = new window.google.maps.places.PlacesService(this.props.map);
    const request = {
      location,
      type,
      rankBy: window.google.maps.places.RankBy.DISTANCE,
    };
    service.nearbySearch(request, (results) => {
      console.log(results);
    });
  }
  findDistanceBetween(origin, destinations) {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations,
        travelMode: "WALKING",
      },
      (response, staus) => {
        console.log(response.rows[0].elements);
      }
    );
  }
}

export default POIBoard;
