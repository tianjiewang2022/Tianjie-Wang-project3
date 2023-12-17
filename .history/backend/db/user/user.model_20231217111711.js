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
    // Assuming you have a 'StatusUpdateModel' with a schema for status updates
    // Adjust the following line accordingly
    // For example, if your status update model is named 'StatusUpdateModel',
    // replace 'StatusUpdateModel' with the actual name of your status update model.
    const StatusUpdateModel = require('./statusUpdate.model');
    return StatusUpdateModel.find({ username: username }).exec();
}

module.exports = {
    createUser,
    findUserByUsername,
    getStatusUpdates,
}