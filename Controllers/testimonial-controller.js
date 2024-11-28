const Testimonial = require('../Models/testimonial');


// Create a new testimonial
exports.createTestimonial = async (req, res) => {
    try {
        const { name, testimony} = req.body;
        const testimonial = new Testimonial({
            name,
            testimony
        });

        await testimonial.save();
        res.status(201).json(testimonial);
        
    } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Server error' });

        
    }

}

// Get all testimonials
exports.getTestimonials = async (req, res) => {
 try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
    if (!testimonials) {
      return res.status(404).json({ message: 'No testimonials found' });
    }
    
 } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Server error' });

    
 }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a testimonial by ID
exports.updateTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, testimonial } = req.body;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, testimonial },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Server error' });
  }
};