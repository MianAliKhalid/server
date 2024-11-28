const jwt = require('jsonwebtoken');
const User = require('../Models/user-model');
const authMiddleware = async (req, res, next) => {
    
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized HTTP. Token not found'
            });
        }
        // console.log("Token:", token);
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded:", decoded);
        const user = await User.findOne({ email: decoded.email })
        .select({ password: 0 })  
        // console.log("User:", user);

        req.user = user;
        req.token = token;
        req.userId = user._id;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Please authenticate'
        });
    }
}
module.exports = authMiddleware;