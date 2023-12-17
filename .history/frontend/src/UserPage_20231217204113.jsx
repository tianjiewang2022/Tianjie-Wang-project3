// // UserPage.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// export default function UserPage() {
//     const [userDetails, setUserDetails] = useState({});
//     const [statusUpdates, setStatusUpdates] = useState([]);
//     const [isLoggedInUser, setIsLoggedInUser] = useState(false);

//     const { username } = useParams();


//     useEffect(() => {
//         console.log('Username:', username);
//         fetchData(username);
//     }, [username]);


//     async function fetchData(username) {
//         try {
//             const userResponse = await axios.get(`/api/user/${username}`);
//             const statusResponse = await axios.get(`/api/user/${username}/statusUpdates`);
//             setUserDetails(userResponse.data);
//             setStatusUpdates(statusResponse.data);

//             // Check if the logged-in user is viewing their own page
//             const loggedInUserResponse = await axios.get('/api/user/isLoggedIn');
//             const loggedInUsername = loggedInUserResponse.data?.username;
//             setIsLoggedInUser(loggedInUsername === username);

//         } catch (error) {
//             console.error('Error fetching user details:', error);
//         }
//     }


//     // Add a function to handle editing the optional description
//     // You can use the same component for editing or redirect to a new page
//     // based on your preference

//     return (
//         <div>
//             <h2>{userDetails.username}</h2>
//             <p>Joined: {userDetails.joinTimestamp}</p>
//             <p>Description: {userDetails.description}</p>
//             {isLoggedInUser && (
//                 <div>
//                     {/* Display optional description for logged-in user */}
//                     {/* <p>Description: {userDetails.description}</p> */}
//                     {/* Add an edit button to modify the description */}
//                     <button>Edit Description</button>
//                 </div>
//             )}
//             <h3>Status Updates</h3>
//             {statusUpdates.map((statusUpdate) => (
//                 <div key={statusUpdate._id}>
//                     <p>{statusUpdate.timestamp}</p>
//                     <p>{statusUpdate.textContent}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function UserPage({ loggedInUser }) {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [description, setDescription] = useState('');
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        fetchUserDetails();
    }, [username]);

    async function fetchUserDetails() {
        try {
            const response = await axios.get(`/api/user/${username}`);
            setUserDetails(response.data);
            setDescription(response.data.description || '');
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    async function handleSaveDescription() {
        try {
            await axios.put(`/api/user/${username}`, { description });
            setEditing(false);
        } catch (error) {
            console.error('Error saving description:', error);
        }
    }

    return (
        <div>
            <h2>User Page</h2>
            <h3>{userDetails.username}</h3>
            <p>Join Timestamp: {userDetails.joinTimestamp}</p>

            {loggedInUser === username && (
                <>
                    {isEditing ? (
                        <>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button onClick={handleSaveDescription}>Save Description</button>
                        </>
                    ) : (
                        <>
                            <p>Description: {description}</p>
                            <button onClick={() => setEditing(true)}>Edit Description</button>
                        </>
                    )}
                </>
            )}

            <h3>Status Updates</h3>
            {userDetails.statusUpdates && userDetails.statusUpdates.length > 0 ? (
                userDetails.statusUpdates.map((statusUpdate) => (
                    <div key={statusUpdate._id}>
                        <p>{statusUpdate.timestamp}</p>
                        <p>{statusUpdate.textContent}</p>
                    </div>
                ))
            ) : (
                <p>No status updates available.</p>
            )}
        </div>
    );
}

