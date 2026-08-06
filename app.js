const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const express = require('express');
const app = express();
app.set('json spaces', 2);
const port = process.env.PORT;

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// this is how I can use middleware. middleware sits inbetween the request and the response
app.use(express.json());
app.use(morgan('dev'));

// 1) MIDDLEWARES

app.use((req, res, next) => {
  console.log('Hello form the middleware');
  next();
});

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all(/.*/, (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server.`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = { app, port };
