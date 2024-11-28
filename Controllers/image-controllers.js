const ImageDetails = require('../Models/image-model');

const uploadImage = async (req, res) => {
    
    try {
        const { image, userId, email } = req.body;
        const newImage = new ImageDetails({ image, userId, email });
        const savedImage = await newImage.save();
        res.status(200).json({ message: 'File uploaded successfully', savedImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}