const express = require('express');
const router = express.Router();
const ServiceController = require('../Controllers/service-controller');

router.route('/services').get(ServiceController.services);
router.route('/services/:id').get(ServiceController.singleservice);

module.exports = router;