const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

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

module.exports = {
    createUser,
    findUserByUsername,
    getStatusUpdates,
}