const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: tours,
  });
});

exports.getSingleTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
  console.log('a tour has been deleted');
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
});
