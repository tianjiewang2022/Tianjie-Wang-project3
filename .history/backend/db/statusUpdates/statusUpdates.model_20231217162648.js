// statusUpdate.model.js
import { model } from 'mongoose';
import { statusUpdateSchema } from './statusUpdates.schema';


const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

async function getStatusUpdatesWithUserDetails() {
    try {
        const statusUpdates = await StatusUpdate.find();

        // Fetch user details for each status update
        const statusUpdatesWithUserDetails = await Promise.all(
            statusUpdates.map(async (update) => {
                const user = await UserModel.findUserByUsername(update.username);
                return {
                    _id: update._id,
                    timestamp: update.timestamp,
                    textContent: update.textContent,
                    user: {
                        username: user.username,
                        joinTimestamp: user.joinTimestamp,
                        description: user.description,
                    },
                };
            })
        );

        return statusUpdatesWithUserDetails;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getStatusUpdatesWithUserDetails,
};