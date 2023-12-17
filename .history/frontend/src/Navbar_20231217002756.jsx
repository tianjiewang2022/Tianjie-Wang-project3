// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">HomePage</Link></li>
                <li><Link to="/login">LoginPage</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/pokemon/:pokemonId">Userpage</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
