const express = require('express');
const User = require('../Models/user-model');





//Home Controller
const home = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Admin Verified'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Register Controller
const register = async (req, res) => {
    try {
        const{username, email, password, phone,role,avatar} = req.body;
        const defaultRole = 'user';
        const userRole = role || defaultRole;
        const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        const userAvatar = avatar || defaultAvatar;


        const checkEmail = await User.findOne({email});
        if(checkEmail){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const user = new User({username, email, password, phone,role:userRole, avatar:userAvatar});
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            data: user,
            token: await user.generateToken(), userId: user._id.toString()

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}



//Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            });
        }
        if (user && isMatch) {
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token: await user.generateToken(), userId: user._id.toString()
            });
        }


    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Logout Controller
const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//User Logic to send user data to the client
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({
             userData            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Update Password Controller
const updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        // Validate input
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify old password
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // Check if the new password is the same as the old one
        const isSamePassword = await user.comparePassword(newPassword);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password",
            });
        }

        // Update the password
        user.password = newPassword;
        await user.save();

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        // Handle server error
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Update Email Controller
const updateEmail = async (req, res) => {
    try {
        const { email, newEmail } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email Already Exists'
            });
        }
        user.email = newEmail;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Email updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Update Phone Controller
const updatePhone = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        user.phone = phone;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Phone updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}










//Exporting Controllers
module.exports = {
    home,
    register,
    login,
    logout,
    updatePassword,
    updateEmail,
    updatePhone,
    user
}