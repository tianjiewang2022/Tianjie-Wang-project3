// AllStatusUpdatesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function AllStatusUpdatesPage() {
    const [allStatusUpdates, setAllStatusUpdates] = useState([]);

    useEffect(() => {
        fetchAllStatusUpdates();
    }, []);

    async function fetchAllStatusUpdates() {
        try {
            const response = await axios.get('/api/statusUpdates'); // Update the endpoint
            const userResponse = await axios.get('/api/user');

            // Sort the updates based on the timestamp from newest to oldest
            const sortedUpdates = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const allUsers = userResponse.data;
            setAllStatusUpdates(sortedUpdates);
            console.log(sortedUpdates);
            console.log(allUsers);
        } catch (error) {
            console.error('Error fetching all status updates:', error);
        }
    }

    return (
        <div>
            <h2>All Status Updates</h2>
            {allStatusUpdates.map((statusUpdate) => (
                <div key={statusUpdate._id}>
                    {/* Use Link to make the username clickable */}
                    <Link to={`/user/${statusUpdate.username}`}>
                        <p>{statusUpdate.username}</p>
                    </Link>
                    <p>{statusUpdate.timestamp}</p>
                    <p>{statusUpdate.textContent}</p>
                </div>
            ))}
        </div>
    );
}
