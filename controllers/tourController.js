const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.send('getting all tours');
};

exports.getSingleTour = (req, res) => {
  res.status(200).send('Fetching a single tour');
};

exports.updateTour = (req, res) => {
  res.status(200).send('updated tour');
};

exports.deleteTour = (req, res) => {
  res.status(204).send('deleted tour');
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
