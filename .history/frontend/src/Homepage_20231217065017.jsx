import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

export default function HomePage() {
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [statusInput, setStatusInput] = useState({
        username: '',
        textContent: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get('/api/user/isLoggedIn');
                const statusResponse = await axios.get('/api/statusUpdates');
                setIsLoggedIn(userResponse.data.username || null);
                setStatusUpdates(statusResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    async function getAllStatusUpdates() {
        try {
            const response = await axios.get('/api/statusUpdates');
            console.log(response.data);
            setStatusUpdates(response.data);
        } catch (error) {
            console.error('Error fetching status updates:', error);
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

    async function createNewStatusUpdate() {
        try {
            // Fetch the user data to get the username
            const userResponse = await axios.get('/api/user/isLoggedIn');
            console.log('User Response:', userResponse.data);

            // Set the current time as the timestamp when creating a new status update
            const newStatusUpdate = {
                textContent: statusInput.textContent,
                username: userResponse.data.username, // Use the fetched username
                timestamp: new Date().toLocaleString(),
            };

            // Create the new status update
            await axios.post('/api/statusUpdates', newStatusUpdate);

            // Clear the text content and fetch all status updates again
            setStatusInput({ textContent: '' });
            fetchData();
        } catch (error) {
            console.error('Error creating status update:', error);
        }
    }

    function setTextContent(event) {
        const newTextContent = event.target.value;
        setStatusInput({ ...statusInput, textContent: newTextContent });
    }

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} logOutUser={logOutUser} />
            <Navbar isLoggedIn={isLoggedIn} />
            <div>
                {statusUpdates.map((statusUpdate) => (
                    <div key={statusUpdate._id}>
                        <p>{statusUpdate.username}</p>
                        <p>{statusUpdate.timestamp}</p>
                        <p>{statusUpdate.textContent}</p>
                    </div>
                ))}
            </div>
            <button onClick={getAllStatusUpdates}>Click here to fetch all status updates</button>
            <div>
                {/* Omit the username input, as it will be automatically set to the logged-in user */}
                Text Content: <input value={statusInput.textContent} onChange={setTextContent} type='text' />
                <button onClick={createNewStatusUpdate}>Submit New Status Update</button>
            </div>
        </div>
    );
}
