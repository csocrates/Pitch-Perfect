import React, { Component } from 'react';
import "./SearchBar.css"

class SearchBar extends Component {

    // eslint-disable-next-line no-undef
    state = {
        searchQuery: ''
    }

    render () {
        const { searchQuery } = this.state;
        return (
            <section>
                <form className="SearchBar__Input" onSubmit={this.handleSubmit}>
                    <label>
                        Campsites near:
                        <input
                            type="text" placeholder="UK place or postcode"
                            onChange={this.handleTyping}
                            value={searchQuery}
                        >
                        </input>
                    </label>
                    <button>Submit</button>
                </form>  
            </section>
        );
    }

    // eslint-disable-next-line no-undef
    handleTyping = (event) => {
        this.setState(() => {
            return { searchQuery: event.target.value };
        });
    }

    // eslint-disable-next-line no-undef
    handleSubmit = (event) => {
        if (event.cancelable) event.preventDefault();
        const searchTerm = this.state.searchQuery;
        this.setState(() => {
            return { searchQuery: '' };
        }, () => {
            this.props.changeLocation(searchTerm);
        });
    }
}

export default SearchBar;