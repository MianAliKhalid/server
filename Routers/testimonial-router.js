const testimonialController = require('../Controllers/testimonial-controller');
const express = require('express');
const router = express.Router();



// Route to get all testimonials
router.get('/get/testimonials', testimonialController.getTestimonials);

// Route to create a new testimonial
router.post('/testimonials', testimonialController.createTestimonial);

// Route to get a single testimonial by ID
router.get('/testimonials/:id', testimonialController.getTestimonialById);

// Route to update a testimonial by ID
router.put('/testimonials/:id', testimonialController.updateTestimonial);

// Route to delete a testimonial by ID
router.delete('/testimonials/:id', testimonialController.deleteTestimonial);

module.exports = router;