import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

export default function HomePage() {
    const [statusUpdates, setStatusUpdates] = useState([]);
    const [statusInput, setStatusInput] = useState({
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
        const response = await axios.get('/api/statusUpdates');
        console.log(response.data);
        setStatusUpdates(response.data);
    }

    async function checkIfUserIsLoggedIn() {
        const response = await axios.get('/api/user/isLoggedIn')

        setActiveUsername(response.data.username)

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
        const newStatusUpdate = {
            textContent: statusInput.textContent,
            username: isLoggedIn,
            timestamp: new Date().toLocaleString(),
        };

        try {
            await axios.post('/api/statusUpdates', newStatusUpdate);
            setStatusInput({ textContent: '' });
            fetchData(); // Fetch data again after creating a new status update
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
