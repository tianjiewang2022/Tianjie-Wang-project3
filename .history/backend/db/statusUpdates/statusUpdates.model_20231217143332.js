// statusUpdate.model.js
const mongoose = require('mongoose');
const { statusUpdateSchema } = require('./statusUpdates.schema');


const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);
function getStatusUpdates(username) {
    const StatusUpdate = require('../statusUpdates/statusUpdates.model');
    return StatusUpdate.find({ username: username }).exec();
}

module.exports = StatusUpdate;