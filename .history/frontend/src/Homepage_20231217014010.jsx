import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

export default function HomePage() {

    const [statusUpdates, setStatusUpdates] = useState([]);
    const [statusInput, setStatusInput] = useState({
        username: '',
        timestamp: '',
        textContent: '',
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        async function checkIfUserIsLoggedIn() {
            try {
                const response = await axios.get('/api/users/isLoggedIn');
                setIsLoggedIn(response.data.username);
            } catch (error) {
                setIsLoggedIn(null);
            }
        }

        checkIfUserIsLoggedIn();
    }, []);

    async function getAllStatusUpdates() {
        const response = await axios.get('/api/status-updates');
        setStatusUpdates(response.data);
    }

    async function logOutUser() {
        await axios.post('/api/user/logOut');
        setIsLoggedIn(null);
    }

    function setUsername(event) {
        const newUsername = event.target.value;
        setStatusInput({ ...statusInput, username: newUsername });
    }

    async function createNewStatusUpdate() {
        // Set the current time as the timestamp when creating a new status update
        const newStatusUpdate = {
            ...statusInput,
            timestamp: new Date().toLocaleString(),
        };
        await axios.post('/api/status-updates', newStatusUpdate);
        setStatusInput({ username: '', timestamp: '', textContent: '' });
        await getAllStatusUpdates();
    }

    function setTextContent(event) {
        const newTextContent = event.target.value;
        setStatusInput({ ...statusInput, textContent: newTextContent });
    }


    async function createNewStatusUpdate() {
        await axios.post('/api/status-updates', statusInput);
        setStatusInput({ username: '', timestamp: '', textContent: '' });
        await getAllStatusUpdates();
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
                Username: <input value={statusInput.username} onChange={setUsername} type='text' />
                Text Content: <input value={statusInput.textContent} onChange={setTextContent} type='text' />
                <button onClick={createNewStatusUpdate}>Submit New Status Update</button>
            </div>
        </div>
    );
};