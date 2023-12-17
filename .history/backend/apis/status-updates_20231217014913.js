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

// Assuming statusUpdateDB is an array with existing status updates
const statusUpdateDB = [
    {
        username: "user1",
        timestamp: "2023-01-01 12:00:00",
        textContent: "This is the first status update.",
    },
    {
        username: "user2",
        timestamp: "2023-01-02 12:00:00",
        textContent: "This is the 2nd status update.",
    },
    {
        username: "user3",
        timestamp: "2023-01-03 12:00:00",
        textContent: "This is the 3st status update.",
    }
    // Add more status updates as needed
];

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
router.get('/', function (req, res) {
    const username = req.cookies.username;

    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
    } catch (e) {
        return res.status(404).send("Invalid request");
    }

    StatusUpdateModel.find({ username: decryptedUsername })
        .then(function (dbResponse) {
            res.cookie("statusUpdateCount", dbResponse.length + 1);
            res.send(dbResponse);
        })
        .catch(function (error) {
            res.status(500).send(error);
        });
});

// Add other routes as needed

module.exports = router;
