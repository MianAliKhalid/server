const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    lowercase: true, 
  },
  personalDetails: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,  // Cloudinary's public ID for the image
    },
    url: {
      type: String,
      required: true,  // Cloudinary's secure URL for the image
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencing a 'User' model, change if you're using a different model
    required: true,
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Create a Mongoose model
const Cloudinary = mongoose.model('Cloudinary', imageSchema);

module.exports = Cloudinary;
