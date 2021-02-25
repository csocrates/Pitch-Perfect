import React, { Component } from "react";
import POIBoard from "../POIBoard/POIBoard";
import SingleCampsiteIntro from "./SingleCampsiteIntro";
import LinkToHomepage from '.././LinkToHomepage'

class SingleCampsiteInfo extends Component {
  state = {
    isLoading: true,
    formatted_address: "",
    business_status: "",
    formatted_phone_number: "",
    rating: undefined,
    photos: [],
    reviews: [],
    location: {},
    name: "",
    googleAPIError: "",
  };

  componentDidMount() {
    const service = new window.google.maps.places.PlacesService(this.props.map);

    if (!this.props.map) {
      this.setState({ isLoading: false, googleAPIError: "No map was found" });
    } else {
      service.getDetails({ placeId: this.props.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.setState({
            isLoading: false,
            formatted_address: place.formatted_address,
            business_status: place.business_status,
            formatted_phone_number: place.formatted_phone_number,
            rating: place.rating,
            photos: place.photos,
            reviews: place.reviews,
            location: place.geometry.location,
            name: place.name,
            googleAPIError: "",
          });
        } else {
          this.setState({ isLoading: false, googleAPIError: status });
        }
      });
    }
  }

  render() {
    if (this.state.isLoading) return "Loading";
    if (this.state.googleAPIError) return <p>{this.state.googleAPIError}</p>;
    return (
      <main className="singleCampsitePage__singleCampsiteInfo">
        <section className="singleCampsiteInfo__singleCampsiteIntro">
          <SingleCampsiteIntro
            formatted_address={this.state.formatted_address}
            business_status={this.state.business_status}
            formatted_phone_number={this.state.formatted_phone_number}
            rating={this.state.rating}
            photos={this.state.photos}
            reviews={this.state.reviews}
            name={this.state.name}
          />
        </section>
        <section className="singleCampsiteInfo__POIBoard">
          <POIBoard map={this.props.map} location={this.state.location} />
        </section>
        <LinkToHomepage />
      </main>
      
    );
  }
}

export default SingleCampsiteInfo;
