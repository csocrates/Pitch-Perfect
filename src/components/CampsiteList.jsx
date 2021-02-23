import React, { Component } from "react";
import CampsiteCard from "./CampsiteCard";

class CampsiteList extends Component {
  // eslint-disable-next-line no-undef
  state = { isLoading: true, campsiteList: [] };

  componentDidMount() {
    this.fetchCampsitesByLocation(this.props.map);
  }
  render() {
    const { isLoading, campsiteList } = this.state;

    return (
      <div>
        {isLoading
          ? ""
          : campsiteList.map((campsite) => {
              return <CampsiteCard campsite={campsite} />;
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
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          campsiteList.push(results[i]);
        }
      }
    });
    this.setState({ isLoading: false, campsiteList });
  }
}

export default CampsiteList;
