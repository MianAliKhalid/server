const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../Models/user-model'); 

// Configure multer for file uploads with a file size limit
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// PUT route to update user avatar
router.put('/avatar/:userId', upload.single('avatar'), async (req, res) => {
  const { userId } = req.params;
  const avatar = req.file;

  if (!avatar) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Convert the uploaded file to a base64 string
    const avatarBase64 = avatar.buffer.toString('base64');

    // Update the user's avatar
    user.avatar = `data:${avatar.mimetype};base64,${avatarBase64}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      data: { image: user.avatar },
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating avatar',
    });
  }
});

module.exports = router;