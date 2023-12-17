import { model } from "mongoose";

import { UserSchema } from './user.schema';
import { statusUpdateSchema } from '../statusUpdates/statusUpdates.schema'

const UserModel = model("UserModel", UserSchema);
const StatusUpdate = model("StatusUpdate", statusUpdateSchema);

function createUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}

function getStatusUpdates(username) {
    const StatusUpdate = require('../statusUpdates/statusUpdates.model').default;
    return StatusUpdate.find({ username: username }).exec();
}

export default {
    createUser,
    findUserByUsername,
    getStatusUpdates,
}