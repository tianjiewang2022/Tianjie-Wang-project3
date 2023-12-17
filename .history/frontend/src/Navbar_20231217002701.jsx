// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">HomePage</Link></li>
                <li><Link to="/login">LoginPage</Link></li>
                <li><Link to="/UserPage">UserPage</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
