import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

export default function HomePage() {
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [statusInput, setStatusInput] = useState({
        textContent: '',
    });
    const [activeUsername, setActiveUsername] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkIfUserIsLoggedIn() {
            try {
                const response = await axios.get('/api/user/isLoggedIn');
                setIsLoggedIn(response.data.username);
            } catch (error) {
                setIsLoggedIn(null);
            }
        }

        checkIfUserIsLoggedIn();
    }, []);
    async function getAllStatusUpdates() {
        const response = await axios.get('/api/statusUpdates');
        setStatusUpdates(response.data);
    }

    async function logOutUser() {
        await axios.post('/api/user/logOut');
        setIsLoggedIn(null);
    }

    async function createNewStatusUpdate() {
        // Set the current time as the timestamp when creating a new status update
        const newStatusUpdate = {
            ...statusInput,
            // Ensure that the username is a string
            username: String(statusInput.username), // Set the username to the logged-in user
            timestamp: new Date().toLocaleString(),
        };

        await axios.post('/api/statusUpdates', newStatusUpdate);
        setStatusInput({ textContent: '' });
        await getAllStatusUpdates();
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
