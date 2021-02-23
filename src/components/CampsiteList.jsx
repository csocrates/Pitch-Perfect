import React, { Component } from "react";
import CampsiteCard from "./CampsiteCard";

class CampsiteList extends Component {
  state = { isLoading: true, campsiteList: [] };
  componentDidMount() {
    if (this.props.map) this.fetchCampsitesByLocation(this.props.map);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.map) {
      this.fetchCampsitesByLocation(this.props.map);
    } else if (
      this.props.map.center.lat() !== prevProps.map.center.lat() &&
      this.props.map.center.lng() !== prevProps.map.center.lng()
    ) {
      this.fetchCampsitesByLocation(this.props.map);
    }
  }
  render() {
    const { isLoading, campsiteList } = this.state;
    if (isLoading) return "Loading";
    if (campsiteList.length === 0) return "No campsite found";
    return (
      <div>
        {this.state.campsiteList.map((campsite) => {
          return <CampsiteCard key={campsite.reference} campsite={campsite} />;
        })}
      </div>
    );
  }
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
}

export default CampsiteList;
