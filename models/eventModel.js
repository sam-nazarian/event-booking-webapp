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
      maxLength: [40, 'An event name must have less or equal then 40 characters!'],
      minLength: [4, 'An event name must have more or equal then 4 characters!'],
      validate: {
        validator: function (value) {
          return validator.isAlpha(value, 'en-US', { ignore: ' ' });
        },
        message: 'Event name must only contain characters!',
      },
    },
    organiser: {
      type: String,
      required: [true, 'An event must have an organiser!'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'An event must have a description!'],
    },
    imageCover: {
      type: String,
    },
    startDate: {
      type: Date, // dd//mm/yyyy
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
    /*
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: [true, 'An address TYPE is required!'],
      },
      coordinates: {
        type: [Number],
        required: [true, 'An address COORDINATE is required!'],
      }, //must have coordinates
      fullAddress: {
        type: String,
        required: [true, 'An address is required!'],
      },
    },
    */
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, //hides id, stops getting 2 different ids, with names: 'id' & '_id'
    versionKey: false, //hides __v from events
  }
);

/**
 * Virtual Populate, creates participants[] on eventSchema
 */
/*
eventSchema.virtual('participants', {
  //_id in localField is called event in participants model
  localField: '_id',
  ref: 'Participant',
  foreignField: 'event',
});
*/

const Event = mongoose.model('Event', eventSchema); //creates the collection
module.exports = Event;
