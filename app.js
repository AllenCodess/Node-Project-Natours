const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const tours = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  'utf-8',
);

app.get('/api/v1/tours', (req, res) => {
  res.send(tours);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
