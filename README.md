
# Service Management Platform 🚀 🚀

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)


A robust Node.js/Express backend API powering the MAK Tech service platform with authentication, image handling, and admin capabilities.

## 📑 Table of Contents

- [Features](#features-)
- [Tech Stack](#Tech-Stack-)
- [Getting Started](#Getting-Started-)
- [Environment Variables](#Environment-Variables-)
- [API Endpoints](#API-Endpoints-)
- [Authentication](#Authentication-)
- [Database Schema](#Database-Schema-)
- [File Upload](#file-upload-)
- [Error Handling](#featuresError-Handling-)
- [Contributing](#Contributing-)

## Features ✨

- 🔐 JWT-based Authentication & Authorization
- 👥 User Management (Admin, Moderator, User roles)
- 📸 Image Upload with Cloudinary Integration
- 💼 Service Management System
- 📝 Testimonial System
- 📞 Contact Form Handler
- 🛡️ Input Validation using Zod
- 🔄 CORS Enabled API
- 📊 MongoDB Database Integration

## Tech Stack 🛠️

- **Runtime**: `Node.js`
- **Framework**: `Express.js`
- **Database**: `MongoDB` with `Mongoose`
- **Authentication**: `JWT`, `bcryptjs`
- **File Upload**: `Multer`, 

Cloudinary


- **Validation**: `Zod`
- **Other Tools**: `Cors`, 

dotenv



## Getting Started 🚀

```sh
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm start
```

The server will start on port 3000 by default.

## Environment Variables 🔑

Create a 

.env

 file in the root directory:

```sh
PORT=3000
ALLOWED_CLIENTS=
MONGO_URI=your_mongodb_uri
SALT_ROUNDS=13
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints 🛣️

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/user` - Get user profile
- `PATCH /auth/update-password` - Update password
- `POST /auth/update-email` - Update email
- `POST /auth/update-phone` - Update phone

### Admin Routes
- `GET /admin/users` - Get all users
- `POST /admin/users/add` - Add new user
- `GET /admin/users/:id` - Get user by ID
- `PATCH /admin/users/update/:id` - Update user
- `DELETE /admin/users/delete/:id` - Delete user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /admin/services/add` - Add new service
- `PATCH /admin/services/update/:id` - Update service
- `DELETE /admin/services/delete/:id` - Delete service

### Image Upload
- `POST /api/upload/upload-image` - Upload image with details
- `GET /api/upload/getForm` - Get all uploaded images
- `PUT /api/upload/profile/:id` - Update image details

## Authentication 🔐

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```sh
Authorization: Bearer <your_jwt_token>
```

## Database Schema 📊

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,  // Hashed
  phone: String,
  role: String,      // 'user', 'admin', 'moderator'
  avatar: String,
  privateNote: String
}
```

### Service Model
```javascript
{
  name: String,
  description: String,
  price: String,
  image: String
}
```

## File Upload 📤

Images are handled using Multer for temporary storage and Cloudinary for permanent cloud storage. Supported formats:
- JPEG
- PNG
- GIF
- WebP

## Error Handling ⚠️

The API implements a centralized error handling middleware that returns errors in the format:

```json
{
  "success": false,
  "message": "Error description",
  "extraDetails": "Additional error context"
}
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/name`
5. Submit a pull request

---

Made with ❤️ by Mian Ali Khalid
