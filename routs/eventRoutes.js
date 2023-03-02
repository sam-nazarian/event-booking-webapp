const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

//convention to call this a router
const router = express.Router(); //creating a new router, which is middleware

//EVENT ROUTES:
router.use(authController.isLoggedIn); //adds userId to req
router.route('/').post(eventController.uploadEventImages, eventController.resizeEventImages, eventController.createEvent);
router.route('/:id').get(eventController.getEvent);

module.exports = router;
