const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn); //adds userId to req

//no base route, base is only being extended
router.get('/', viewsController.createEvent); //.getHomepage
router.get('/create-event', viewsController.createEvent);
router.get('/share-event/:id', viewsController.shareEvent);
router.get('/event/:id', viewsController.getEvent);

module.exports = router;
