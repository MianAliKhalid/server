const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your Username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
    phone: {
        type: String,
        required: [false, 'Please enter your phone number'],
        trim: true,
        // match: [/^03\d{9}$/, 'Please enter a valid Pakistan phone number starting with "03" and followed by 9 digits']
        minlength: 10,
        maxlength: 11

    },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    role: {
        type: String,
        // enum: ['user', 'admin','moderator'],
        required: true,
        // default: 'user'
    },
    avatar: {
        type: String,
        default: ''
    },
    privateNote: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

//Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    try {
        const salt = await await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        this.password = await bcrypt.hash(this.password, salt);
    }
    catch (error) {
        next(error);
    }
});


//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    }
    catch (error) {
        next(error);
    }
}

//Return JWT token

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,


        }, process.env.JWT_SECRET, { expiresIn: '30d' });
    } catch (error) {
        console.error(error);

    }
};


const User = mongoose.model('User', userSchema);
module.exports = User;