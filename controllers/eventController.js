const multer = require('multer');
const sharp = require('sharp');
const Event = require('../models/eventModel'); //Event is a Collection/model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

/**
 * Store multer in memory, not in hard drive
 */
const multerStorage = multer.memoryStorage();

/**
 * Add a filter to multer, only allows images to be uploaded
 */
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

/**
 * For single uploads, Stores images in req.file
 * name of field in html that will hold the file is imageCover & will be only having a single photo
 */
exports.uploadEventImages = upload.single('imageCover');

/**
 * Resize Images, save them to the img folder. Add name of image to req.body.
 */
exports.resizeEventImages = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //On database the image field is called imageCover
  req.body.imageCover = `event-${req.userId || 'UNDEFINED-ID'}-${Date.now()}-cover.jpeg`;
  await sharp(req.file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/events/${req.body.imageCover}`);

  next();
});

// EVENT ROUTE HANDLERS:

/**
 * Creates an event based on req.body info in mongoDB database
 */
exports.createEvent = catchAsync(async (req, res, next) => {
  //create automatically saves the document
  const doc = await Event.create(req.body);

  //TODO CHANGE THIS LATER
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

/**
 * Displays an event based on the id in the parameter in mongoDB database
 */
exports.getEvent = catchAsync(async (req, res, next) => {
  //find document with the id in event collection
  const doc = await Event.findById(req.params.id).populate('participants').select('-__v');

  if (!doc) {
    return next(new AppError('No Event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
