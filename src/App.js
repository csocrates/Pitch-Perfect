import "./App.css";
import React, { Component } from "react";
import Header from "./components/header/Header";
import CampsitesPage from "./components/campsites-page/CampsitesPage";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  // eslint-disable-next-line no-undef
  state = { username: "", ownerOrUser: "" };

  render() {
    return (
      <div className="Main">
        <Header setUser={this.setUser} username={this.state.username} />
        <CampsitesPage />
      </div>
    );
  }
  setUser = (username, ownerOrUserString) => {
    this.setState({ username, ownerOrUser: ownerOrUserString });
  };
}

export default App;
