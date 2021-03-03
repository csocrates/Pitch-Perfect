import React, { Component } from "react";
import * as api from "../../apis";
import ClipLoader from "react-spinners/ClipLoader";
import "./Userpage.css";

class UserPage extends Component {
  state = { user: {}, isLoading: true };
  componentDidMount() {
    this.getUserDetails(this.props.username);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CDU", this.props.username);
    const { username } = this.props;
    if (prevProps.username !== username) {
      this.getUserDetails(username);
    }
  }

  render() {
    const { username, camping_history } = this.state.user;
    console.log("HELLOE", this.state);
    return this.state.isLoading ? (
      <ClipLoader />
    ) : (
      <div>
        <h2 className="userpage__title">Your Account</h2>
        <h4 className="userpage__header">Personal Details:</h4>
        <p className="userpage__middle">Username: {username}</p>
        <p className="userpage__bottom" id="underline">
          Change your password
        </p>
        <h4 className="userpage__header">Your Upcoming Bookings:</h4>
        <p className="userpage__middle">
          You are going to: <br />
          <p className="userpage__campsite-link">Enywers Campsite</p>
          Date: 21-07-2021 <br />
          Duration: 3 days.
          <br />
          <br />
        </p>

        <p className="userpage__middle" id="underline">
          Contact the owner
        </p>
        <p className="userpage__bottom" id="underline">
          Cancel this booking
        </p>

        <>
          <h4 className="userpage__header">Your Camping History:</h4>
          {camping_history.length !== 0 ? (
            camping_history.map((place) => {
              return (
                <p className="userpage__middle" key={place.campsite_name}>
                  Where: {place.campsite_name} <br />
                  When: {place.date.slice(0, 10)}
                  <p className="userpage__review-link">Leave a review</p>
                </p>
              );
            })
          ) : (
            <p classame="userpage__middle">You haven't been camping yet...</p>
          )}
          <p className="userpage__bottom"></p>
        </>
      </div>
    );
  }
  getUserDetails = (username) => {
    api.getUser(username).then(({ data: { user } }) => {
      this.setState({ user, isLoading: false });
    });
  };
}

export default UserPage;
