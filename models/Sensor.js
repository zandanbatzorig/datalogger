const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  devid: {
    type: String,
    required: true
  },
  devserial: {
    type: String,
    required: true
  },
  temp1: {
    type: Number,
    required: true
  },
  temp2: {
    type: Number,
    required: true
  },
  humi: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);