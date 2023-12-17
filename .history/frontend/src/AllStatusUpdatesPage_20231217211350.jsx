import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import './AllStatusUpdates.css';

export default function AllStatusUpdatesPage() {
    const [allStatusUpdates, setAllStatusUpdates] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchAllStatusUpdates();
    }, []);

    async function fetchAllStatusUpdates() {
        try {
            const response = await axios.get('/api/statusUpdates');
            const sortedUpdates = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setAllStatusUpdates(sortedUpdates);

            const userResponse = await axios.get('/api/user/isLoggedIn');
            setIsLoggedIn(userResponse.data.username || null);
        } catch (error) {
            console.error('Error fetching all status updates:', error);
        }
    }

    async function logOutUser() {
        try {
            await axios.post('/api/user/logOut');
            setIsLoggedIn(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} logOutUser={logOutUser} />
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="container">
                <h2>All Status Updates</h2>
                {allStatusUpdates.map((statusUpdate) => (
                    <div className="status-update" key={statusUpdate._id}>
                        <Link to={`/user/${statusUpdate.username}`}>
                            <p>{statusUpdate.username}</p>
                        </Link>
                        <p>{statusUpdate.timestamp}</p>
                        <p>{statusUpdate.textContent}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
