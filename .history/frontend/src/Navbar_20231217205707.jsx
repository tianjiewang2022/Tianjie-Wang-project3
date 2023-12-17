// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav>
            <ul>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/">HomePage</Link></li>
                        <li><Link to="/all">All Status Update</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">HomePage</Link></li>
                        <li><Link to="/register">Sign up</Link></li>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/all">All Status Update</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
