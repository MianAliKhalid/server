const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model to link the image to a specific user
      required: true,
    },
    public_id: {
      type: String,
      required: true, // Cloudinary's public_id to reference the image
    },
    secure_url: {
      type: String,
      required: true, // The URL where the image is stored
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
