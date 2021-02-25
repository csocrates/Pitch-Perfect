import React from 'react';
import { Link } from '@reach/router'
import './LinkToHomepage.css'

const LinkToHomepage = () => {
return (
    <div>
        <Link to="/">
        <button className="homepage-button">Return to homepage!</button>
        </Link>
    </div>
)
}

export default LinkToHomepage;