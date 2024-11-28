const Contact = require('../Models/contact-model');

const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const newContact = new Contact({
      username,
      email,
      message,
    });
    await newContact.save();
    res.status(200).json({ msg: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { contact };