import React from 'react';
import './Marker.css';

const Marker = ({ image }) => {
    return (
        <div className="Marker__holder">
            <img
                src={image}
                alt="camp location" className="Marker__icon"
                // onMouseEnter={() => {
                //     setIsShown(true, id);
                // }}
                // onMouseLeave={() => {
                //     setIsShown(false, id)
                // }}
            />
{/* 
            {(show && shownId === id) && (
            <div>
                <p className="Marker__name">{name}</p>
            </div>
            )} */}

        </div>);
}

export default Marker;