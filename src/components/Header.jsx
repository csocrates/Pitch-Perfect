import React from 'react';
import './Header.css'

const Header = ({profilePicture = "https://ichef.bbci.co.uk/news/976/cpsprodpb/12B60/production/_109004667_02untitledgoosegamescreen3840x2160.png?w=600?w=650"}) => {
    return (
        <main className="App__Header">
            <h1 className='App__HeaderTitle'>Pitch Perfect</h1>
            <img className="App__HeaderProfilePic" src={profilePicture} alt="profile"></img>
        </main>
    );
};

export default Header;