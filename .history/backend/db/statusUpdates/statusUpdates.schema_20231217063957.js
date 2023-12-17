// statusUpdates.schema.js
const { Schema } = require('mongoose');

exports.statusUpdateSchema = new Schema({
    username: {
        type: Schema.Types.Mixed,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    textContent: {
        type: String,
        required: true,
    }
}, { collection: 'statusUpdates2023' });
