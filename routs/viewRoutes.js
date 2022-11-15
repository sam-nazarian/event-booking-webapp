const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.use(viewsController.isLoggedIn); //adds userId to req

//no base route, base is only being extended
router.get('/', viewsController.getHomepage);
router.get('/create/:id', viewsController.createEvent); //authController.protect,
router.get('/:id', viewsController.getEvent);

module.exports = router;
