import React, { Component } from "react";
import NearestCard from "./NearestCard";
import pubIcon from "../../Images/beer-icon.png";
import supermarketIcon from "../../Images/supermarket-icon.webp";
import cafeIcon from "../../Images/cafe-icon.webp";
import goosePic from "../../Images/painted-goose.png";
import ClipLoader from "react-spinners/ClipLoader";

class POIBoard extends Component {
  state = {
    isLoading: true,
    nearestBars: [],
    nearestSupermarkets: [],
    nearestCafes: [],
    placesLoaded: false,
    barDistanceInfo: [],
    cafeDistanceInfo: [],
    restaurantDistanceInfo: [],
    barLoaded: false,
    cafeLoaded: false,
    supermarketLoaded: false,
  };

  componentDidMount() {
    const { location } = this.props;
    this.fetchNearestPlaces(location);
  }

  componentDidUpdate() {
    const { location } = this.props;
    const {
      nearestBars,
      nearestSupermarkets,
      nearestCafes,
      barLoaded,
      cafeLoaded,
      supermarketLoaded,
      placesLoaded,
      isLoading,
    } = this.state;
    console.log(placesLoaded, isLoading);

    if (isLoading) {
      if (barLoaded && cafeLoaded && supermarketLoaded) {
        this.setState({ isLoading: false });
      }

      if (placesLoaded && isLoading && !barLoaded) {
        if (nearestBars.length !== 0) {
          this.findDistanceBetween("bar", location, [
            nearestBars[0]?.geometry.location,
          ]);
        } else {
          this.setState({ barLoaded: true });
        }
      }
      if (placesLoaded && isLoading && !cafeLoaded) {
        if (nearestCafes.length !== 0) {
          this.findDistanceBetween("cafe", location, [
            nearestCafes[0]?.geometry.location,
          ]);
        } else {
          this.setState({ cafeLoaded: true });
        }
      }
      if (placesLoaded && isLoading && !supermarketLoaded) {
        if (nearestSupermarkets.length !== 0) {
          this.findDistanceBetween("supermarket", location, [
            nearestSupermarkets[0]?.geometry.location,
          ]);
        } else {
          this.setState({ supermarketLoaded: true });
        }
      }

      // this.findDistanceBetween(location, [
      //   nearestBars[0]?.geometry.location,
      //   nearestSupermarkets[0]?.geometry.location,
      //   nearestCafes[0]?.geometry.location,
      // ]);
    }
  }

  render() {
    const {
      isLoading,
      nearestBars,
      nearestSupermarkets,
      nearestCafes,
      barDistanceInfo,
      supermarketDistanceInfo,
      cafeDistanceInfo,
    } = this.state;
    console.log("new bar info: ", barDistanceInfo);

    if (isLoading) return <ClipLoader />;
    return (
      <div className="poiBoard">
        {nearestBars.length === 0 ? (
          <p className="no-poi-msg">
            Sorry, there doesn't appear to be any pubs nearby...
            <img className="lost-goose" src={goosePic} alt="Lost Goose" />
          </p>
        ) : (
          <NearestCard
            type="Pub"
            name={nearestBars[0].name}
            distance={barDistanceInfo[0].distance.text}
            onFoot={barDistanceInfo[0].duration.text}
            icon={pubIcon}
          />
        )}
        {nearestSupermarkets.length === 0 ? (
          <p className="no-poi-msg">
            Sorry, there doesn't appear to be any supermarkets nearby...
            <img className="lost-goose" src={goosePic} alt="Lost Goose" />
          </p>
        ) : (
          <NearestCard
            type="Supermarket"
            name={nearestSupermarkets[0].name}
            distance={supermarketDistanceInfo[0].distance.text}
            onFoot={supermarketDistanceInfo[0].duration.text}
            icon={supermarketIcon}
          />
        )}
        {nearestCafes.length === 0 ? (
          <p className="no-poi-msg">
            Sorry, there doesn't appear to be any cafes nearby...
            <img className="lost-goose" src={goosePic} alt="Lost Goose" />
          </p>
        ) : (
          <NearestCard
            type="Cafe"
            name={nearestCafes[0].name}
            distance={cafeDistanceInfo[0].distance.text}
            onFoot={cafeDistanceInfo[0].duration.text}
            icon={cafeIcon}
          />
        )}
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
      // radius: 50000,
      type: ["bar"],
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
        type: ["supermarket"],
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
          type: ["cafe"],
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

  findDistanceBetween(type, origin, destination) {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destination,
        travelMode: "WALKING",
      },
      ({ rows }, status) => {
        console.log("DM: ", rows);
        if (status !== "OK") {
          console.log("Error was " + status);
        } else {
          if (type == "bar") {
            this.setState({
              barLoaded: true,
              barDistanceInfo: rows[0].elements,
            });
          }
          if (type == "cafe") {
            this.setState({
              cafeLoaded: true,
              cafeDistanceInfo: rows[0].elements,
            });
          }
          if (type == "supermarket") {
            this.setState({
              supermarketLoaded: true,
              supermarketDistanceInfo: rows[0].elements,
            });
          }
        }
      }
    );
  }
}

export default POIBoard;
