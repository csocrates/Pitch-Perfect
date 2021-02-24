import React, { Component } from "react";

class POIBoard extends Component {
  state = {
    isLoading: true,
    nearestBars: [],
    nearestSupermarkets: [],
    nearestCafes: [],
  };

  componentDidMount() {
    const { location } = this.props;
    this.fetchNearestPlaces(location);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    console.log("CDU", prevProps.location, location);
    const { nearestBars, nearestSupermarkets, nearestCafes } = this.state;
    console.log(nearestBars[0]);
    if (
      location.lat() !== prevProps.location.lat() &&
      location.lng() !== prevProps.location.lng()
    ) {
      this.findDistanceBetween(location, [
        nearestBars[0].geometry.location,
        nearestSupermarkets[0].geometry.location,
        nearestCafes[0].geometry.location,
      ]);
    }
  }

  render() {
    return <div></div>;
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
            isLoading: false,
          });
        });
      });
    });
  }

  findDistanceBetween(origin, destinations) {
    console.log("FIND DISTANCE");
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations,
        travelMode: "WALKING",
      },
      (response, staus) => {
        console.log(response);
      }
    );
  }
}

export default POIBoard;
