import React, { Component } from "react";
import "./SearchBar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class SearchBar extends Component {
  // eslint-disable-next-line no-undef
  state = {
    searchQuery: "",
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <section className="SearchBar">
        {/* <form className="SearchBar__Input" onSubmit={this.handleSubmit}>
          <label>
            Campsites near:
            <input
              type="text"
              placeholder="UK place or postcode"
              onChange={this.handleTyping}
              value={searchQuery}
            ></input>
          </label>
          <button>Submit</button>
        </form> */}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="SearchBar__Input">
            <Form.Label className="SearchBar__label">
              Campsites near:{" "}
            </Form.Label>
            <Form.Row>
              <Col>
                <Form.Control
                  type="campsiteSearch"
                  placeholder="UK place or postcode"
                  onChange={this.handleTyping}
                  value={searchQuery}
                />
              </Col>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form.Row>
          </Form.Group>
        </Form>
      </section>
    );
  }

  // eslint-disable-next-line no-undef
  handleTyping = (event) => {
    this.setState(() => {
      return { searchQuery: event.target.value };
    });
  };

  // eslint-disable-next-line no-undef
  handleSubmit = (event) => {
    if (event.cancelable) event.preventDefault();
    const searchTerm = this.state.searchQuery;
    this.setState(
      () => {
        return { searchQuery: "" };
      },
      () => {
        this.props.changeLocation(searchTerm);
      }
    );
  };
}

export default SearchBar;
