const { app, port } = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
