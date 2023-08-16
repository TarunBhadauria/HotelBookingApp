const mongoose = require('mongoose');

const notificationSchema = new      mongoose.Schema({
    heading: {
        type: String,
        required: true,
    }, 
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    wasRead: {
        type: Boolean,
        default: false,
        required: true,
    }
})

module.exports = mongoose.model('Notification', notificationSchema);