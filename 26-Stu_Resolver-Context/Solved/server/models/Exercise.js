const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  //description will be basic and have a list of all body parts
  description: {
    type: String,
    required: true,
    trim: true,
  },
  //Turned into an array so we can multiple per exercise
  bodyPart: [{
    type: String,
    required: true,
  }],
  equipment: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  //Step by step guide
  instructions: {
    type: String,
    required: true,
  },
  //Questions for John/Nick - DO i even need a created at for the exercise if it is seeded data
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
