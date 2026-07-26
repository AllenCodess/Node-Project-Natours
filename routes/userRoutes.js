const express = require('express');
const router = express.Router();

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route has not been configured' });
};

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
