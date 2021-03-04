import React from 'react';
import './SingleCampsiteIntro.css'

const SingleCampsiteReviews = ({username, body, created_at}) => {
    return (
        <div>
            <p className="review__body">
                {body}
            </p>
            <p className="review__author"
            >
                {`Written by ${username} on ${new Date(created_at).toString().split('GMT')[0]}`}
            </p>
        </div>
    );
};

export default SingleCampsiteReviews;