const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);

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
  res.status(204).send('updated tour');
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send('no body or price');
  }
  next();
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
        return res.status(500).send(`${err} Server Error`);
      }
      res.send(newTour);
    },
  );
};
