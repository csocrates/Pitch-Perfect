import React, { Component } from "react";

class CampsiteList extends Component {
  state = { isLoading: true, campsiteList: [] };

  componentDidMount() {
    this.fetchCampsitesByLocation(this.props.map);
  }
  render() {
    const { isLoading, campsiteList } = this.state;
    //map function here which invokes campsite card component

    return <div>{isLoading ? "" : campsiteList}</div>;
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
