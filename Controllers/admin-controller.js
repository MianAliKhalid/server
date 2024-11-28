const User = require('../Models/user-model');
const Contact = require('../Models/contact-model');
const Service = require('../Models/service-model');

//----------------------------------------------------------------------------------------------------
// User Controller
//----------------------------------------------------------------------------------------------------

//Add a new user
const addUser = async (req, res) => {
    try {
        const { username, email, password, phone, avatar, role } = req.body;
       

        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }

        const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        const userAvatar = avatar || defaultAvatar;

        const user = new User({
            username,
            email,
            password,
            phone,
            avatar: userAvatar,
            role,
        });

        console.log('User being saved:', user);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error while adding user:', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// Get all users data
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
        console.log("users", users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users data Count
const getAllUsersCount = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).countDocuments();
        // console.log("users", users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get single user data by ID
const getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user data by ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updateUser },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.deleteOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//----------------------------------------------------------------------------------------------------
// Contact Controller
//----------------------------------------------------------------------------------------------------

// Get all contact data
const getContacts = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;


        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);


        const skip = (pageNumber - 1) * limitNumber;


        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);


        const totalContacts = await Contact.countDocuments();


        const totalPages = Math.ceil(totalContacts / limitNumber);


        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }


        return res.status(200).json({
            contacts,
            totalPages,
            totalContacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all contact data Count
const getContactsCount = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).countDocuments();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }
        return res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get single contact data by ID
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findOne({ _id: id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        return res.status(200).json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//----------------------------------------------------------------------------------------------------
// Services Controller
//----------------------------------------------------------------------------------------------------

// Add a new service
const addService = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        const checkService = await Service.findOne({ name });
        if (checkService) {
            return res.status(400).json({
                success: false,
                message: 'Service already exists'
            });
        }

        const defaultProvider = 'MAK Tech';
        const defaultPrice = 'Contact us';
        const defaultImage = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg';


        const servicePrice = price || defaultPrice;
        const serviceImage = image || defaultImage;

        const service = new Service({
            name,
            description,
            price: servicePrice,
            image: serviceImage,

        });

        await service.save();

        res.status(200).json({
            success: true,
            message: 'Service added successfully',
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all service data
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }
        return res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all service data Count
const getAllServicesCount = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 }).countDocuments();
        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }
        return res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Get Single Service by ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findOne({ _id: id });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update service data by ID
const updateServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateService = req.body;

        const service = await Service.findByIdAndUpdate(id,
            { $set: updateService },
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete service by ID
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.deleteOne({ _id: id });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//----------------------------------------------------------------------------------------------------
// Exporting Controllers
//----------------------------------------------------------------------------------------------------
module.exports = {
    getAllUsers,
    getUsersById,
    updateUserById,
    deleteUser,
    getContacts,
    getContactById,
    getAllServices,
    updateServiceById,
    deleteService,
    getServiceById,
    addUser,
    addService,
    getContactsCount,
    getAllUsersCount,
    getAllServicesCount

};
