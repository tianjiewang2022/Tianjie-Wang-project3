const mongoose = require('mongoose');

const statusUpdateSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    textContent: {
        type: String,
        required: true,
    }, { collection: 'usersSpr2023' });

const StatusUpdate = mongoose.model('StatusUpdate', statusUpdateSchema);

module.exports = StatusUpdate;

const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
}, { collection: 'usersSpr2023' });


