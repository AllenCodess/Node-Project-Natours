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

module.exports = { app, port };
