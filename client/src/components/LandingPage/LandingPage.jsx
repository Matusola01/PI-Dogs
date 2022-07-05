import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

class LandingPage extends React.Component {
    
    render() {
        return (
            <div className='backgroundImage'>
                    <h1 className='title'>Henry Dogs</h1>
                    <Link to={`/home`}>
                        <button className='buttonHome'><h1><span>Home</span></h1></button>
                    </Link>
            </div>

    )}
};

export default LandingPage;