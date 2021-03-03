import React, { Component } from "react";
import POIBoard from "../POIBoard/POIBoard";
import SingleCampsiteIntro from "./SingleCampsiteIntro";
import LinkToHomepage from ".././LinkToHomepage";
import "./SingleCampsiteInfo.css";
import ClipLoader from "react-spinners/ClipLoader";
import SingleCampsiteReviews from "./SingleCampsiteReviews";
import * as api from '../../apis';

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
    reviewsLoaded: false,
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

  componentDidUpdate () {
    if (!this.state.reviewsLoaded) {
      api.getReviewsById(this.props.place_id)
        .then((reviews) => {
          this.setState(() => {
            return { reviews, reviewsLoaded: true };
          })
        })
    }
  }

  render () {
    if (this.state.isLoading) return <ClipLoader />;
    if (this.state.googleAPIError)
      return (
        <>
          <p>{this.state.googleAPIError}</p>
          <LinkToHomepage />
        </>
      );
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
        <section className="singleCampsiteInfo__reviews">
          {this.state.reviews.length === 0 ?
            <>
              <p className="reviews__title">
                No reviews yet. Register above to have your say.
              </p>
            </>
            :
            <>
              <p className="reviews__title">
                {`Reviews for ${this.state.name}`}
              </p>
              {this.state.reviews.map((review, index) => {
                return <SingleCampsiteReviews
                  username={review.username}
                  body={review.review}
                  created_at={review.created_at}
                  key={index}
                />;
              })}
            </>
          }
        </section>
        <section className="singleCampsiteInfo__LinkToHomepage">
          <LinkToHomepage />
        </section>
      </main>
    );
  }
}

export default SingleCampsiteInfo;
