const multer = require('multer');
const sharp = require('sharp');
const Event = require('../models/eventModel'); //Event is a Collection/model
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
 * name of field in html that will hold the file is coverImage & will be only having a single photo
 */
exports.uploadEventImages = upload.single('image');

/**
 * Resize Images, save them to the img folder. Add name of image to req.body.
 */
exports.resizeEventImages = async (req, res, next) => {
  if (!req.file) return next();

  //On database the image field is called imageCover
  req.body.imageCover = `event-${req.user.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.file.buffer).resize(2000, 1333).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/events/${req.body.imageCover}`);

  next();
};

// EVENT ROUTE HANDLERS:
// exports.getEvent = ; //poopulate participants
// exports.createEvent = ;
