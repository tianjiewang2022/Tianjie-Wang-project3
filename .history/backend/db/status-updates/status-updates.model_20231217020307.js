// statusUpdate.model.js
const mongoose = require('mongoose');

const statusUpdateSchema = new mongoose.Schema({
    username: String,
    timestamp: String,
    textContent: String,
});

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;
