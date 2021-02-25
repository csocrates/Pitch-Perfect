import React from 'react';
import './Marker.css';

const Marker = ({ image, name, isShown: {show, shownId}, setIsShown, id }) => {
    return (
        <div className="Marker__holder">
            <a href={`#${id}`}>
                <img
                    src={image}
                    alt="camp location"
                    className="Marker__icon"
                    onClick={() => {
                        setIsShown(true, id);
                    }}>
                </img>
            </a>
            {(show && shownId === id) && (
                <p className="Marker__name" >
                    {name}
                </p>
            )}
        </div>
        );
}

export default Marker;