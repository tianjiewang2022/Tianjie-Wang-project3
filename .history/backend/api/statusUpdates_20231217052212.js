// statusUpdates.js
const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../db/statusUpdates/statusUpdates.model');
const jwt = require('jsonwebtoken');

// POST /api/status-updates
router.post('/', async function (req, res) {
    try {
        const newStatusUpdate = req.body;
        console.log('Received new status update:', newStatusUpdate);

        const username = req.cookies.username;

        // Verify the user's token to get the username
        let decryptedUsername;
        try {
            decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
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
// ... (unchanged)

module.exports = router;
