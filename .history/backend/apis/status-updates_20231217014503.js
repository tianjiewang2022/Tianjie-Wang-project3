// statusUpdate.model.js
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

const statusUpdateModel = require('../db/status-updates/statusUpdate.model');

const userDB = [];

router.get('/', function (request, response) {
    response.send(userDB);
})

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
