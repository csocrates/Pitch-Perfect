import "./App.css";
import React, { Component } from "react";
import Header from "./components/Header";
import CampsitesPage from "./components/campsites-page/CampsitesPage";

class App extends Component {
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
