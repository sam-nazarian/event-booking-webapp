const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn); //adds userId to req

//no base route, base is only being extended
router.get('/', viewsController.getHomepage);
router.get('/create-event', viewsController.createEvent); //authController.protect,
router.get('/get-event/:id', viewsController.getEvent);

module.exports = router;
