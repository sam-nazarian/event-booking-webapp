const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn); //adds userId to req

//no base route, base is only being extended
router.get('/', viewsController.getHomepage);
router.get('/:id', viewsController.getEvent);
router.get('/create', viewsController.createEvent); //authController.protect,

module.exports = router;
