const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');

exports.getHomepage = catchAsync(async (req, res, next) => {});

exports.createEvent = catchAsync(async (req, res, next) => {
  res.status(200).render('createEvent', {
    title: 'Create Event',
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const event = await Event.findById(req.params.id).populate('participants').select('-__v');

  // 2) Build & Render template using tour data from 1
  res.status(200).render('event', {
    title: event.name,
    event: event,
  });
});
