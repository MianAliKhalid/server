require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./Database/db');
const authRouter = require('./Routers/auth-router');
const errorMiddleware = require('./Middleware/error-middleware');
const serviceRouter = require('./Routers/service-route');
const avatarRoute = require('./Routers/avatar-update');
const imageRoute = require('./Routers/image-route');
const adminRouter = require('./Routers/admin-router');
const userRoutes = require('./Routers/userRoutes');
const TestimonialRouter = require('./Routers/testimonial-router');

//Middleware
//Increase the limit of the request body
// app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Cors Middleware
const corsOptions = {
    // origin: process.env.ALLOWED_CLIENTS,
    origin: '*',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//Error Middleware
app.use(errorMiddleware);







//Routes
app.use('/auth', authRouter);
app.use('/api', serviceRouter);
app.use('/upload', avatarRoute);
app.use('/testimonial', TestimonialRouter);
//Cloudinary Routes
app.use('/api/file', userRoutes);
//Admin Routes
app.use('/admin', adminRouter);
//Requirement form image upload
app.use('/api/upload', imageRoute);



// Catch-all for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});



//Listen

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port ' + process.env.PORT);
            console.log('Cors accepted' );
        });
    }
    )
