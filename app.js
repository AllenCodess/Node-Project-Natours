const express = require('express');
const app = express();
const port = 3000;
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

// 4) SERVER
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
