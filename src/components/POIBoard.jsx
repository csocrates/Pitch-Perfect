import React, { Component } from "react";
import NearestCard from "./NearestCard";

class POIBoard extends Component {
  state = {
    isLoading: true,
    nearestBars: [],
    nearestSupermarkets: [],
    nearestCafes: [],
    placesLoaded: false,
    distanceInfo: [],
  };

  componentDidMount() {
    const { location } = this.props;
    this.fetchNearestPlaces(location);
  }

  componentDidUpdate() {
    const { location } = this.props;
    const { nearestBars, nearestSupermarkets, nearestCafes } = this.state;
    if (this.state.placesLoaded) {
      this.findDistanceBetween(location, [
        nearestBars[0].geometry.location,
        nearestSupermarkets[0].geometry.location,
        nearestCafes[0].geometry.location,
      ]);
    }
  }

  render() {
    const {
      isLoading,
      nearestBars,
      nearestSupermarkets,
      nearestCafes,
      distanceInfo,
    } = this.state;

    if (isLoading) return "Loading...";
    return (
      <div>
        <NearestCard
          type="Pub"
          name={nearestBars[0].name}
          distance={distanceInfo[0].distance.text}
        />
        <NearestCard
          type="Supermarket"
          name={nearestSupermarkets[0].name}
          distance={distanceInfo[1].distance.text}
        />
        <NearestCard
          type="Cafe"
          name={nearestCafes[0].name}
          distance={distanceInfo[2].distance.text}
        />
      </div>
    );
  }
  fetchNearestPlaces(location) {
    let nearestBars = [];
    let nearestSupermarkets = [];
    let nearestCafes = [];

    const service = new window.google.maps.places.PlacesService(this.props.map);
    const barRequest = {
      location,
      type: "bar",
      rankBy: window.google.maps.places.RankBy.DISTANCE,
    };
    service.nearbySearch(barRequest, (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < 3; i++) {
          nearestBars.push(results[i]);
        }
      }
      const supermarketRequest = {
        location,
        type: "supermarket",
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      };
      service.nearbySearch(supermarketRequest, (results, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < 3; i++) {
            nearestSupermarkets.push(results[i]);
          }
        }
        const cafeRequest = {
          location,
          type: "cafe",
          rankBy: window.google.maps.places.RankBy.DISTANCE,
        };
        service.nearbySearch(cafeRequest, (results, status) => {
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < 3; i++) {
              nearestCafes.push(results[i]);
            }
          }
          this.setState({
            nearestBars,
            nearestSupermarkets,
            nearestCafes,
            placesLoaded: true,
          });
        });
      });
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
      ({ rows }, status) => {
        if (status !== "OK") {
          console.log("Error was " + status);
        } else {
          this.setState({
            distanceInfo: rows[0].elements,
            placesLoaded: false,
            isLoading: false,
          });
        }
      }
    );
  }
}

export default POIBoard;
