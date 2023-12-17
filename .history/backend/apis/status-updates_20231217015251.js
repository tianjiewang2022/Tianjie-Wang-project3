// statusUpdate.model.js
const mongoose = require('mongoose');

const statusUpdateSchema = new mongoose.Schema({
    username: String,
    timestamp: String,
    textContent: String,
});

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;

// statusUpdate.routes.js
const express = require('express');
const router = express.Router();
const StatusUpdateModel = require('../db/statusUpdate.model');
const jwt = require('jsonwebtoken');

// POST /api/status-updates
router.post('/', async function (req, res) {
    const newStatusUpdate = req.body;

    const username = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
    } catch (e) {
        return res.status(404).send("Invalid request");
    }

    newStatusUpdate.username = decryptedUsername;
    newStatusUpdate.timestamp = new Date().toLocaleString(); // Set current time as timestamp

    try {
        const createStatusUpdateResponse = await StatusUpdateModel.create(newStatusUpdate);
        console.log(createStatusUpdateResponse);
        return res.send("Status Update Successfully Created: " + createStatusUpdateResponse);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// GET /api/status-updates
router.get('/', async function (req, res) {
    const username = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
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
