// UserPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UserPage() {
    const [userDetails, setUserDetails] = useState({});
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    const { username } = useParams();

    useEffect(() => {
        console.log('Username:', username);
        fetchData(username);
    }, [username]);


    async function fetchData(username) {
        try {
            const userResponse = await axios.get(`/api/user/:${username}`);
            const statusResponse = await axios.get(`/api/user/${username}/statusUpdates`);

            setUserDetails(userResponse.data);
            setStatusUpdates(statusResponse.data);

            // Check if the logged-in user is viewing their own page
            const loggedInUserResponse = await axios.get('/api/user/isLoggedIn');
            const loggedInUsername = loggedInUserResponse.data.username;
            setIsLoggedInUser(loggedInUsername === username);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    // Add a function to handle editing the optional description
    // You can use the same component for editing or redirect to a new page
    // based on your preference

    return (
        <div>
            <h2>{userDetails.username}</h2>
            <p>Joined: {userDetails.timestamp}</p>
            {isLoggedInUser && (
                <div>
                    {/* Display optional description for logged-in user */}
                    <p>Description: {userDetails.description}</p>
                    {/* Add an edit button to modify the description */}
                    <button>Edit Description</button>
                </div>
            )}
            <h3>Status Updates</h3>
            {statusUpdates.map((statusUpdate) => (
                <div key={statusUpdate._id}>
                    <p>{statusUpdate.timestamp}</p>
                    <p>{statusUpdate.textContent}</p>
                </div>
            ))}
        </div>
    );
}
