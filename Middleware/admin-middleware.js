const adminMiddleware = (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.role === 'admin' || req.user.role === 'moderator';
        if (!adminRole) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized HTTP. Admin access only'
            });
        }
        
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;