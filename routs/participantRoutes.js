const express = require('express');
const participantController = require('../controllers/participantController');

const router = express.Router();
router.route('/:id').post(participantController.uploadParticipantImage, participantController.resizeParticipantImage, participantController.createParticipant);

module.exports = router;
