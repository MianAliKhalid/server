const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    testimony: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1705563088246-3673a401ed6a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxpbmd8ZW58MHx8MHx8fDA%3D", 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5 
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
