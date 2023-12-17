const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    joinTimestamp: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
}, { collection: 'user2023' });

