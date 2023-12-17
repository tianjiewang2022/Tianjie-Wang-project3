const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../db/statusUpdates/statusUpdates.model');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Import axios for making HTTP requests

// POST /api/status-updates
router.post('/', async function (req, res) {
    try {
        const newStatusUpdate = req.body;
        console.log('Received new status update:', newStatusUpdate);

        // Retrieve the username from the api/user endpoint
        const userResponse = await axios.get('/api/user/isLoggedIn');



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
router.get('/', async function (req, res) {
    try {
        // Retrieve the username from the api/user endpoint
        const userResponse = await axios.get('/api/user/isLoggedIn');
        const username = userResponse.data.username;

        // Fetch status updates for the logged-in user
        const userStatusUpdates = await StatusUpdateModel.find({ username });

        // Display user status updates on the homepage
        res.cookie("statusUpdateCount", userStatusUpdates.length);
        res.send(userStatusUpdates);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Add other routes as needed

module.exports = router;