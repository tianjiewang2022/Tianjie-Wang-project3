// statusUpdate.model.js
import { model } from 'mongoose';
import { statusUpdateSchema } from './statusUpdates.schema';


const StatusUpdate = model('StatusUpdate', statusUpdateSchema);

function getStatusUpdates(username) {
    return StatusUpdate.find({ username: username }).exec();
}

export default getStatusUpdates;