// statusUpdate.model.js
const mongoose = require('mongoose');
const { statusUpdateSchema } = require('./statusUpdates.schema');

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;