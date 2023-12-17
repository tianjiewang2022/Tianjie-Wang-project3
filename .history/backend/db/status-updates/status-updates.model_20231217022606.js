// statusUpdate.model.js
const mongoose = require('mongoose');

const statusUpdateSchema = require('./status-updates.schema').statusUpdateSchema;

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;

const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}

module.exports = {
    createUser,
    findUserByUsername,
}