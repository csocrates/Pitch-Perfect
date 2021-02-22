import React from 'react';
import './Header.css'

const Header = ({profilePicture = "https://1734811051.rsc.cdn77.org/data/images/full/372134/attn-cat-lovers-scientists-claim-using-profile-pics-of-your-and-your-cat-wont-give-you-a-date.jpg?w=600?w=650"}) => {
    return (
        <main className="App__Header">
            <h1 className='App__HeaderTitle'>Pitch Perfect</h1>
            <img className="App__HeaderProfilePic" src={profilePicture} alt="profile"></img>
        </main>
    );
};

export default Header;