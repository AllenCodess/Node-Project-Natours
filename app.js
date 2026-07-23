const express = require('express');
const app = express();
const port = 3000;

// defines the route and the handler that runs when that route is hit
app.get('/', (req, res) => {
  res.status(404).send('Hello from Express');
});

// declares which port to listen on
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
