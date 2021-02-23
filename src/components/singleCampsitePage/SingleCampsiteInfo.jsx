import React, { Component } from "react";
import * as apis from "../../apis";
class SingleCampsiteInfo extends Component {
  state = { isLoading: true };

  componentDidMount() {
    apis.fetchPlaceDetailById(this.props.place_id).then(console.log);
  }

  render() {
    return <></>;
  }
}

export default SingleCampsiteInfo;
