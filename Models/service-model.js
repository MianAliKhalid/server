const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the service'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter the description'],
        trim: true
    },
    price: {
        type: String,
        default: 'Contact us', 
        trim: true
    },
    image: {
        type: String, 
        required: true,
    },
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);