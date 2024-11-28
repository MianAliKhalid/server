const express = require('express');
const upload = require('../Middleware/multerMiddleware');
const imageController = require('../Controllers/userController'); 

const router = express.Router();

// Upload and save an image, with metadata (via Multer)
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Fetch all images, including associated user details (excluding sensitive fields like avatar and password)
router.get('/images', imageController.getAllImages);

// Fetch a specific user's details by user ID
router.get('/user/:id', imageController.getUserDetails);

// Update metadata for an existing image (such as first name, last name, etc.)
router.put('/update', imageController.updateImage);

// Update the status of an image (approved, pending, rejected)
router.put('/update-status', imageController.updateImageStatus);

// Delete an image by its ID (removes from both Cloudinary and the database)
router.delete('/delete-image/:id', imageController.deleteImage);

//Display all services with status peniding
// router.get('/services/pending', imageController.getAllServices);

// Upload an image for a service
router.post('/service-image', upload.single('file'), imageController.uploadServiceImage);
// router.post('/service-image', imageController.uploadServiceImage);
router.patch('/services/update/:id', imageController.updateService);


//Display all services with status approved
router.get('/services/approved', imageController.approved);

//Display all services with status pending
router.get('/services/pending', imageController.pending);



module.exports = router;
