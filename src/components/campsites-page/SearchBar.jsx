import React, { Component } from 'react';

class SearchBar extends Component {

    state = {
        searchQuery: ''
    }

    render () {
        const { searchQuery } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
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
            </>
        );
    }

    handleTyping = (event) => {
        this.setState(() => {
            return { searchQuery: event.target.value };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const searchTerm = this.state.searchQuery;
        this.setState(() => {
            return { searchQuery: '' };
        }, () => {
            this.props.changeLocation(searchTerm);
        });
    }
}

export default SearchBar;