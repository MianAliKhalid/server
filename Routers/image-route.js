const express = require('express');
const router = express.Router();
const ImageDetails = require('../Models/image-model');

// POST route to upload image and details
router.post('/upload-image', async (req, res) => {
  const { firstName, lastName, email, personalDetails, city, province, country, image, userId } = req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !email || !image || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create a new entry
    const newImageDetails = new ImageDetails({
      firstName,
      lastName,
      email,
      personalDetails,
      city,
      province,
      country,
      image,
      userId,
    });

    // Save to database
    const response = await newImageDetails.save();

    res.status(200).json({
      success: true,
      message: 'Image and details uploaded successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error uploading image and details:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image and details',
    });
  }
});

// GET route to fetch all images
router.get('/getForm', async (req, res) => {
  try {
    // Fetch all entries
    const images = await ImageDetails.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images',
    });
  }
});

// PUT route to update image details
router.put('/profile/:id', async (req, res) => {
  const { personalDetails, image } = req.body;
  const { id } = req.params;

  try {
    // Find the entry by ID
    const imageDetails = await ImageDetails.findById(id);

    if (!imageDetails) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    // Update the details
    if (personalDetails) {
      imageDetails.personalDetails = personalDetails;
    }
    if (image) {
      imageDetails.image = image;
    }

    // Save the updated entry
    const response = await imageDetails.save();

    res.status(200).json({
      success: true,
      message: 'Image details updated successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error updating image details:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating image details',
    });
  }
});

module.exports = router;
