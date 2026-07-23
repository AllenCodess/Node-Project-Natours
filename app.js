const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// // defines the route and the handler that runs when that route is hit
// app.get('/', (req, res) => {
//   res.status(404).send('Hello from Express');
// });

// // declares which port to listen on
// app.listen(port, () => {
//   console.log(`app running on port ${port}`);
// });

const tours = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  'utf-8',
  (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  },
);

app.get('/api/v1/tours', (req, res) => {
  res.send(tours);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
