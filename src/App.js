import "./App.css";
import React, { Component } from "react";
import Header from "./components/header/Header";
import CampsitesPage from "./components/campsites-page/CampsitesPage";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  // eslint-disable-next-line no-undef
  state = {};

  render() {
    return (
      <div>
        <Header />
        <CampsitesPage />
      </div>
    );
  }
}

export default App;
