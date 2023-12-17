// statusUpdate.model.js
import { model } from 'mongoose';
import { statusUpdateSchema } from './statusUpdates.schema';


const StatusUpdateModel = model('StatusUpdate', statusUpdateSchema);

function getStatusUpdates(username) {
    return StatusUpdateModel.find({ username: username }).exec();
}

export default getStatusUpdates;