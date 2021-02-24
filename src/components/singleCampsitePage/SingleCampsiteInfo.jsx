import React, { Component } from "react";
import * as apis from "../../apis";
import POIBoard from "../POIBoard";
import SingleCampsiteIntro from "./SingleCampsiteIntro";

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
  };

  componentDidMount() {
    // apis.fetchPlaceDetailById(this.props.place_id).then(console.log);
    const service = new window.google.maps.places.PlacesService(this.props.map);
    service.getDetails({ placeId: this.props.place_id }, (place, status) => {
      console.log("PLACEDETAILS", place);
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
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
        });
      }
    });
  }

  render() {
    if (this.state.isLoading) return "Loading";
    return (
      <>
        <SingleCampsiteIntro
          formatted_address={this.state.formatted_address}
          business_status={this.state.business_status}
          formatted_phone_number={this.state.formatted_phone_number}
          rating={this.state.rating}
          photos={this.state.photos}
          reviews={this.state.reviews}
          name={this.state.name}
        />
        <POIBoard map={this.props.map} location={this.state.location} />
      </>
    );
  }
}

export default SingleCampsiteInfo;
