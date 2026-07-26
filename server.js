const { app, port } = require('./app');

// 4) SERVER
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
