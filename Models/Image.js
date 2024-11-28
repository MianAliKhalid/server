const mongoose = require('mongoose');
const User = require('./user-model');

const imageSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    personalDetails: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    status: { type: String, required: true, enum: ['approved','pending','rejected'],default: 'pending'},

    url: { type: String, required: true },
    publicId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
},{ timestamps: true });


module.exports = mongoose.model('Image', imageSchema);
