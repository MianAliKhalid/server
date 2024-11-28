const fs = require('fs');
const cloudinary = require('../config/cloudinaryConfig');
const User = require('../Models/user-model');
const Image = require('../Models/Image')
const Service = require('../Models/service-model');
//-----------------------------------//
// Upload and Save Image
//-----------------------------------//
exports.uploadImage = async (req, res) => {
    try {
        const { firstName, lastName, email, personalDetails, city, province, country } = req.body;
        const filePath = req.file.path;

        const result = await cloudinary.uploader.upload(filePath);

        const image = new Image({
            url: result.secure_url,
            publicId: result.public_id,
            user: req.body.userId,
            firstName, lastName, email, personalDetails, city, province, country
        });
        const savedImage = await image.save();
        fs.unlinkSync(filePath);

        res.status(201).json({ message: 'Image uploaded successfully', image: savedImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
};

//-----------------------------------//
// Fetch All Images
//-----------------------------------//
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find().populate('user', '-avatar -password').sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Failed to fetch images', error: error.message });
    }
};

//-----------------------------------//
// Fetch User Details
//-----------------------------------//
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('image');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
    }
};

//-----------------------------------//
// Update Image Metadata
//-----------------------------------//
exports.updateImage = async (req, res) => {
    try {
        const { imageId, firstName, lastName, email, personalDetails, city, province, country } = req.body;

        // Find the image by ID
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Update image metadata
        image.firstName = firstName || image.firstName;
        image.lastName = lastName || image.lastName;
        image.email = email || image.email;
        image.personalDetails = personalDetails || image.personalDetails;
        image.city = city || image.city;
        image.province = province || image.province;
        image.country = country || image.country;

        // Save updated image
        const updatedImage = await image.save();

        res.status(200).json({ message: 'Image updated successfully', image: updatedImage });
    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ message: 'Failed to update image', error: error.message });
    }
};

//-----------------------------------//
// Update Image Status (approved, pending, rejected)
//-----------------------------------//
exports.updateImageStatus = async (req, res) => {
    try {
        const { imageId, status } = req.body;

        // Validate status value
        if (!['approved', 'pending', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find the image and update its status
        const image = await Image.findByIdAndUpdate(imageId, { status }, { new: true });

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image status updated', image });
    } catch (error) {
        console.error('Error updating image status:', error);
        res.status(500).json({ message: 'Failed to update image status', error: error.message });
    }
};


//Display image with status pending
exports.pending = async (req, res) => {
    try {
        const services = await Image.find({ status: 'pending' }).populate('user', '-avatar -password').sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to fetch services', error: error.message });
    }
};

//Display all services with status approved
exports.approved = async (req, res) => {
    try {
        const services = await Image.find({ status: 'approved' }).populate('user', '-avatar -password').sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to fetch services', error: error.message });
    }
};

//-----------------------------------//
// Delete Image
//-----------------------------------//
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the image by ID
        const image = await Image.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(image.publicId);

        if (!image) {
            return res.status(404).json({ message: "Image not found." });
        }
        res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Error deleting image." });
    }
};


//-----------------------------------//
// Upload Service Image 
//-----------------------------------//

exports.uploadServiceImage = async (req, res) => {
    try {
        const filePath = req.file.path; 

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath);

        // Delete the file from the local storage
        fs.unlinkSync(filePath);

        res.status(201).json({ 
            message: 'Image uploaded successfully', 
            url: result.secure_url, 
            publicId: result.public_id 
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
};



//Upload services image
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, description, price, image },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service updated successfully', service: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Failed to update service', error: error.message });
    }
};

