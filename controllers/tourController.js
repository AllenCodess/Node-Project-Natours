const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.send(JSON.stringify(tours, null, 2));
};

exports.getSingleTour = (req, res) => {
  const tour = req.tour || req.name;
  res.status(200).send(tour);
};

exports.updateTour = (req, res) => {
  res.status(200).send('updated tour');
};

exports.deleteTour = (req, res) => {
  res.status(204).send('deleted tour');
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send('no body or price');
  }
  next();
};

exports.createTour = (req, res) => {
  res.status(204).send('created tour');
};
