const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const mongoose = require('mongoose');
const DB = process.env.DATABASE;
const Tour = require('./../../models/tourModel');

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message);
  }
};

connectDB();

//Read json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//Import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data sucessfull loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
