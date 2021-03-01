import "./App.css";
import React, { Component } from "react";
import Header from "./components/header/Header";
import CampsitesPage from "./components/campsites-page/CampsitesPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/login/LoginPage";

class App extends Component {
  // eslint-disable-next-line no-undef
  state = { username: "", isUser: false, isOwner: false };

  render() {
    return (
      <div>
        <Header />
        <LoginPage setUser={this.setUser} username={this.state.username} />
        <CampsitesPage />
      </div>
    );
  }
  setUser = (username) => {
    this.setState({ username });
  };
}

export default App;
