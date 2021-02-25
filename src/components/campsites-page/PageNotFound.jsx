import React from 'react';
import './PageNotFound.css';
import gooseGif from '../../Images/404-goose.gif'
import LinkToHomepage from '../LinkToHomepage';

const PageNotFound = () => {
    return (
        <>
        <div className="page-not-found">
           <h1>404 Page not found</h1>
            <img className="lost-goose-gif" src={gooseGif} alt="walking goose"/>
            <p>It seems the goose has got lost, please click the button below to go back to the homepage</p>       
        </div> 
        <LinkToHomepage />
        </>
    )
}

export default PageNotFound;