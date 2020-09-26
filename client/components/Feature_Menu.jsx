import React from 'react';
import { Link } from 'react-router-dom';

const Feature_Menu = () => {
    return (
        <nav>
            <ul>
                <Link to='/avem'><li>AV Event Mixer</li></Link>
            </ul>
        </nav>
    )
}

export default Feature_Menu;
