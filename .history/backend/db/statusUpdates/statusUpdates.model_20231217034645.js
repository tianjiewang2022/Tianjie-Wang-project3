// statusUpdate.model.js
const mongoose = require('mongoose');

const statusUpdateSchema = require('./statusUpdates.schema').statusUpdateSchema;

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;



