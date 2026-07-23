const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// this is how I can use middleware. middleware sits inbetween the request and the response
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

app.get('/api/v1/tours', (req, res) => {
  res.send(tours);
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
