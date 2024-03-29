const multer = require('multer');
const sharp = require('sharp');
const Participant = require('../models/participantModel'); //Review is a collection
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//image will be stored as a buffer & not to the memory
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadParticipantImage = upload.single('picture');

exports.resizeParticipantImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    req.body.picture = 'default.jpeg';
    return next();
  }

  //as we used buffer in memory it din't add a name to the file
  req.body.picture = `user-${req?.userId || req?.cookies?.user || 'UNDEFINED-USERID'}-${Date.now()}.jpeg`;

  next();
});

exports.createParticipant = catchAsync(async (req, res, next) => {
  req.body.eventId = req.params.id; //if no eventId id given, set to parameter id (form router)
  req.body.userId = req.userId || 1234562; //if no userId id given, set to logged in user id (based on browser's cookie)
  req.body.attending = req.body.attending === 'true' ? true : false; //convert String to Boolean

  const doc = await Participant.create(req.body); //create automatically saves the document

  //image saving & processing
  if (req.file) {
    await sharp(req.file.buffer).resize(250, 250).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/img/users/${req.body.picture}`);
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
