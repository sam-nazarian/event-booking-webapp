const express = require('express');
const participantController = require('../controllers/participantController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn); //adds userId to req
router.route('/:id').post(participantController.uploadParticipantImage, participantController.resizeParticipantImage, participantController.createParticipant);

module.exports = router;
