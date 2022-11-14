const Participant = require('../models/participant'); //Review is a collection
const catchAsync = require('../utils/catchAsync');

exports.createParticipant = catchAsync((req, res, next) => {
  req.params.tourId; //if no tour id given, set to parameter id (form router)
  req.userId; //if no user id given, set to logged in user id (got from protect)
  next();
});
