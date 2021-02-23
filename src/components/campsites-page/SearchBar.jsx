import React, { Component } from 'react';
import "./SearchBar.css"

class SearchBar extends Component {

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

    handleTyping = (event) => {
        this.setState(() => {
            return { searchQuery: event.target.value };
        });
    }

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