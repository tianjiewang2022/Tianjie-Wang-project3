// AllStatusUpdatesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllStatusUpdatesPage() {
    const [allStatusUpdates, setAllStatusUpdates] = useState([]);

    useEffect(() => {
        fetchAllStatusUpdates();
    }, []);

    async function fetchAllStatusUpdates() {
        try {
            const response = await axios.get('/api/statusUpdates'); // Update the endpoint
            setAllStatusUpdates(response.data);
        } catch (error) {
            console.error('Error fetching all status updates:', error);
        }
    }

    return (
        <div>
            <h2>All Status Updates</h2>
            {/* {allStatusUpdates.map((statusUpdate) => (
                <div key={statusUpdate._id}>
                    <p>{statusUpdate.username}</p>
                    <p>{statusUpdate.timestamp}</p>
                    <p>{statusUpdate.textContent}</p>
                </div>
            ))} */}
        </div>
    );
}
