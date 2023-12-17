import { model } from "mongoose";

import { UserSchema } from './user.schema';

const UserModel = model("UserModel", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}

function getStatusUpdates(username) {
    const StatusUpdate = require('../statusUpdates/statusUpdates.model');
    return StatusUpdate.find({ username: username }).exec();
}

export default {
    createUser,
    findUserByUsername,
    getStatusUpdates,
}