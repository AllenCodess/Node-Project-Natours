const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);

router.param('id', (req, res, next, val) => {
  const id = Number(val);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).send('tour doesnt exist');
  }
  req.tour = tour;
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
