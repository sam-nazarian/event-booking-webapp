const mongoose = require('mongoose');
const validator = require('validator');

//Schema is a constructor which takes a parameter of an object, that's why we do 'new'
const eventSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    name: {
      type: String,
      required: [true, 'An event must have a name!'],
      trim: true,
      maxLength: [39, 'An event name must have less than 40 characters!'],
      // minLength: [4, 'An event name must have more or equal then 4 characters!'],
      // validate: {
      //   validator: function (value) {
      //     return validator.isAlpha(value, 'en-US', { ignore: ' ' });
      //   },
      //   message: 'Event name must only contain characters!',
      // },
    },
    organiser: {
      type: String,
      // required: [true, 'An event must have an organiser!'],
    },
    description: {
      type: String,
      trim: true,
      // required: [true, 'An event must have a description!'],
    },
    imageCover: {
      type: String,
    },
    date: {
      type: Date, // yyyy/mm/dd
      required: [true, 'An event must have a start date!'],
    },
    startTime: {
      type: String,
      required: [true, 'An event must have a start time!'],
    },
    endTime: {
      type: String,
      required: [true, 'An event must have an end time!'],
    },
    // GeoJSON - must have type and coordinates - https://mongoosejs.com/docs/geojson.html
    location: {
      // location must have type & coordinates
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      // [Longitude, Latitude]
      coordinates: {
        type: [Number],
      },
      addressDescription: {
        type: String,
      },
      addressFull: {
        type: String,
        required: [true, 'An address is required!'],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, //hides id, stops getting 2 different ids, with names: 'id' & '_id'
    versionKey: false, //hides __v from events
  }
);

eventSchema.index({ loc: '2dsphere' });

/**
 * Virtual Populate, creates participants[] on eventSchema
 */
eventSchema.virtual('participants', {
  //_id in localField is called eventId in participants model
  localField: '_id',
  ref: 'Participant',
  foreignField: 'eventId',
});

const Event = mongoose.model('Event', eventSchema); //creates the collection
module.exports = Event;
