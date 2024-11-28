const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please enter your message'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = contact = mongoose.model('Contact', ContactSchema);