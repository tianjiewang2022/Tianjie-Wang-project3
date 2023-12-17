// statusUpdates.js
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

        const username = req.cookies.username;

        // Verify the user's token to get the username
        let decryptedUsername;
        try {
            const decodedToken = jwt.verify(username, "HUNTERS_PASSWORD");
            decryptedUsername = decodedToken.username;
        } catch (e) {
            console.error('Error verifying token:', e);
            return res.status(404).send("Invalid request");
        }

        // Set the username and timestamp in the new status update
        newStatusUpdate.username = decryptedUsername;
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
    const username = req.cookies.username;

    // Verify the user's token to get the username
    let decryptedUsername;
    try {
        const decodedToken = jwt.verify(username, "HUNTERS_PASSWORD");
        decryptedUsername = decodedToken.username;
    } catch (e) {
        return res.status(404).send("Invalid request");
    }

    try {
        // Fetch status updates for the logged-in user
        const userStatusUpdates = await StatusUpdateModel.find({ username: decryptedUsername });
        // Display user status updates on the homepage
        res.cookie("statusUpdateCount", userStatusUpdates.length);
        res.send(userStatusUpdates);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Add other routes as needed

module.exports = router;
