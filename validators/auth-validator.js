const { z } = require('zod');

// Registration Schema
const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' })
    .regex(/^[a-zA-Z0-9_.]+$/, { message: 'Username must not contain special characters except dots' }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: 'Invalid email format' }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^03\d{9}$/, { message: 'Phone number must starting with "03" and followed by 9 digits' })
    .min(10, { message: 'Phone number must be 10 digits long' })
    .max(11, { message: 'Phone number must be exactly 11 digits long' }),

  role: z
  .enum(['user', 'admin', 'moderator'], { message: 'Invalid role' }).default('user')

});

// Login Schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: 'Invalid email format' }),

  password: z
    .string({ required_error: "Password is required" })
});


//Change Password Schema
const changePasswordSchema = z.object({
email: z
    .string({ required_error: "Email is required" }),


  oldPassword: z
    .string({ required_error: "Old Password is required" }),

  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),

  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })

}); 

module.exports = { registerSchema, loginSchema, changePasswordSchema };