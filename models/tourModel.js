const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A group must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'Agroup must have a difficulty'],
  },
  ratingAverage: { type: Number, default: 4.5 },
  ratingQuantity: { type: Number, deafult: 0 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  priceDiscount: { type: Number },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour  must have a summary'],
  }, // removes all whitespace in string
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, ' A tour must have a imageCover'],
  },
  images: [String],
  createdAt: { type: Date, default: Date.now() },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
