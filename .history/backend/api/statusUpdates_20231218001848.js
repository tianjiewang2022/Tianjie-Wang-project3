// import jwt from 'jsonwebtoken';
// import axios from 'axios'; // Import axios for making HTTP requests

const { Router } = require('express');
const router = Router();
const StatusUpdateModel = require('../db/statusUpdates/statusUpdates.model').default.default;
const UserModel = require('../db/user/user.model').default;


// POST /api/status-updates
router.post('/', async function (req, res) {
    try {
        const newStatusUpdate = req.body;
        console.log('Received new status update:', newStatusUpdate);
        newStatusUpdate.timestamp = new Date().toLocaleString(); // Set current time as timestamp

        // Debugging: Log the newStatusUpdate before saving it
        console.log('New status update before saving:', newStatusUpdate);

        // Create the status update in the database
        const createStatusUpdateResponse = await StatusUpdateModel.create(newStatusUpdate);
        console.log('Status Update Successfully Created:', createStatusUpdateResponse);
        return res.send("Status Update Successfully Created: " + createStatusUpdateResponse);
    } catch (error) {
        console.error('Error creating status update:', error);
        return res.status(500).send(error);
    }
});

// GET /api/status-updates
// router.get('/', async function (req, res) {
//     try {
//         // Fetch all status updates from the database
//         const allStatusUpdates = await StatusUpdateModel.find();

//         // Display all status updates on the homepage
//         res.cookie("statusUpdateCount", allStatusUpdates.length);
//         res.send(allStatusUpdates);
//     } catch (error) {
//         return res.status(500).send(error);
//     }
// });

// GET /api/status-updates
router.get('/', async function (req, res) {
    try {
        const statusUpdatesWithUserDetails = await StatusUpdateModel.getStatusUpdatesWithUserDetails();
        res.cookie("statusUpdateCount", statusUpdatesWithUserDetails.length);
        res.send(statusUpdatesWithUserDetails);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/:username/statusUpdates', async function (req, res) {
    const username = req.params.username;

    try {
        const statusUpdates = await getStatusUpdates(username);
        console.log('Status Updates:', statusUpdates);
        const statusUpdatesResponse = statusUpdates.map((update) => ({
            _id: update._id,
            timestamp: update.timestamp,
            textContent: update.textContent,
        }));

        return res.send(statusUpdatesResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /api/statusUpdatesWithUsers
router.get('/statusUpdatesWithUsers', async function (req, res) {
    try {
        // Fetch all status updates from the database and populate the 'user' field
        const allStatusUpdates = await StatusUpdateModel.find().populate('user');

        // Map the results to send only the necessary information to the client
        const statusUpdatesWithUsers = allStatusUpdates.map((update) => ({
            user: {
                username: update.user.username,
                // Add other user fields as needed
            },
            statusUpdate: {
                _id: update._id,
                timestamp: update.timestamp,
                textContent: update.textContent,
            },
        }));

        res.send(statusUpdatesWithUsers);
    } catch (error) {
        console.error('Error fetching status updates with users:', error);
        res.status(500).send(error);
    }
});

module.exports = router;


// export default router;
