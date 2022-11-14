const Participant = require('../models/participantModel'); //Review is a collection
const catchAsync = require('../utils/catchAsync');

exports.createParticipant = catchAsync(async (req, res, next) => {
  req.body.eventId = req.params.id; //if no eventId id given, set to parameter id (form router)
  req.body.userId = req?.userId || 123456; //if no userId id given, set to logged in user id (based on browser's cookie)

  const doc = await Participant.create(req.body); //create automatically saves the document

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
