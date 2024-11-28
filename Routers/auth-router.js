const express =  require('express')
const router = express.Router()
const AuthController = require('../Controllers/auth-controller')
const validate = require('../Middleware/validate-middleware')
const { registerSchema, loginSchema, changePasswordSchema} = require('../validators/auth-validator') 
const authMiddleware = require('../Middleware/auth-middleware')
const ContactController = require('../Controllers/contact-controller')

router.route('/').get(AuthController.home)
// router.route('/register').post( AuthController.register)
router.route('/register').post(validate(registerSchema), AuthController.register)
router.route('/login').post(validate(loginSchema),AuthController.login)
router.route('/user').get(authMiddleware,AuthController.user)
router.route('/contact').post(ContactController.contact)
router.route('/update-password').patch(AuthController.updatePassword)
router.route('/update-email').post( AuthController.updateEmail)  
router.route('/update-phone').post( AuthController.updatePhone)  



module.exports = router;
