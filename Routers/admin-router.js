const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin-controller');
const authMiddleware = require('../Middleware/auth-middleware');
const adminMiddleware = require('../Middleware/admin-middleware');
const { registerSchema } = require('../validators/auth-validator');
const validate = require('../Middleware/validate-middleware');

router.route('/users').get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router.route('/users/count').get(authMiddleware, adminMiddleware, adminController.getAllUsersCount);
router.route('/users/add').post(authMiddleware, adminMiddleware,validate(registerSchema), adminController.addUser);
router.route('/users/:id').get(authMiddleware, adminMiddleware, adminController.getUsersById);
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getContacts);
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteUser);
router.route('/contacts').get(authMiddleware, adminMiddleware, adminController.getContacts);
router.route('/contacts/count').get(authMiddleware, adminMiddleware, adminController.getContactsCount);
router.route('/contacts/:id').get(authMiddleware, adminMiddleware, adminController.getContactById);
router.route('/services').get(authMiddleware, adminMiddleware, adminController.getAllServices);
router.route('/services/count').get(authMiddleware, adminMiddleware, adminController.getAllServicesCount);
router.route('/services/add').post(authMiddleware, adminMiddleware, adminController.addService);
router.route('/services/:id').get(authMiddleware, adminMiddleware, adminController.getServiceById);
router.route('/services/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateServiceById);
router.route('/services/delete/:id').delete(authMiddleware, adminMiddleware, adminController.deleteService);




module.exports = router;