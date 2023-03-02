const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    attending: {
      type: Boolean,
      required: [true, 'Participant must have an attending field!'],
    },
    name: {
      type: String,
      required: [true, 'Participant must have a name!'],
    },
    picture: {
      type: String,
    },
    //Parent referencing (Participant refers Event)
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: [true, 'Participant must belong to an event!'],
    },
    userId: {
      type: String,
      required: [true, 'Participant must belong to a user!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, //stops getting 2 different ids, with names: 'id' & '_id'
    versionKey: false, //hides __v from events
  }
);

// participantSchema.index({ eventId: 1, userId: 1 }, { unique: true }); //combination of eventId & userId must be unique

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
