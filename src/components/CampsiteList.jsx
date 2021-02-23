import React, { Component } from "react";
import CampsiteCard from "./CampsiteCard";

class CampsiteList extends Component {
  state = { isLoading: true, campsiteList: [] };

  componentDidMount() {
    console.log(this.props.map);
    this.fetchCampsitesByLocation(this.props.map);
  }
  render() {
    const { isLoading, campsiteList } = this.state;
    return (
      <div>
        {isLoading
          ? ""
          : this.state.campsiteList.map((campsite) => {
              return (
                <CampsiteCard key={campsite.reference} campsite={campsite} />
              );
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
    console.log("fetchcamp", map);
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      console.log(status);
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          campsiteList.push(results[i]);
        }
        console.log(campsiteList);
        this.setState({ isLoading: false, campsiteList });
      }
    });
  }
}

export default CampsiteList;
