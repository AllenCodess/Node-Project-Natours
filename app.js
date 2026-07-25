const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const morgan = require('morgan');
// this is how I can use middleware. middleware sits inbetween the request and the response
app.use(express.json());
app.use(morgan('dev'));

// 1) MIDDLEWARES

app.use((req, res, next) => {
  console.log('Hello form the middleware');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf-8'),
);

// 2) ROUTE HANDLERS

const getAllTours = (req, res) => {
  res.send(JSON.stringify(tours, null, 2));
};

const getSingleTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).send('tour doesnt exist');
  }
  res.status(200).send(tour);
};

const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).send('invalid id');
  }
  res.status(200).send('updated tour');
};

const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    return res.status(404).send(null);
  }
  res.status(204).send('updated tour');
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
        res.status(500).send(`${err} Server Error`);
      }
      res.send(newTour);
    },
  );
};

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

// 3) ROUTES

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter
  .route('/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);

// app.route('/api/v1/tours').get(getAllTours).post(createTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getSingleTour)
//   .patch(updateTour)
//   .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4) SERVER
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
