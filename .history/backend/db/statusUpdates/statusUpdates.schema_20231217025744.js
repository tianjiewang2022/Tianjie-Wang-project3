const Schema = require('mongoose').Schema;


exports.statusUpdateSchema = new Schema({
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
    }
}, { collection: 'statusupdates2023' });




