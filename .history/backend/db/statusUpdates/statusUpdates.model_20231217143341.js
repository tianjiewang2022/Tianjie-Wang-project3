// statusUpdate.model.js
import { model } from 'mongoose';
import { statusUpdateSchema } from './statusUpdates.schema';


const StatusUpdate = model('StatusUpdate', statusUpdateSchema);

function getStatusUpdates(username) {
    const StatusUpdate = require('../statusUpdates/statusUpdates.model').default;
    return StatusUpdate.find({ username: username }).exec();
}

export default StatusUpdate;