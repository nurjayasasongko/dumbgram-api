const express = require('express');
const router = express.Router();

// controller
const { register, login } = require('../controllers/auth')
const { 
  getUsers, 
  editUser, 
  deleteUser, 
  getFollowers, 
  getFollowing
} = require('../controllers/user')

// middleware
const { auth } = require('../middlewares/auth')

// auth route
router.post('/register', register);
router.post('/login', login);

// user route
router.get('/users', getUsers);
router.patch('/user/:id', auth, editUser);
router.delete('/user/:id', deleteUser);
router.get('/followers/:id', getFollowers);
router.get('/followings/:id', getFollowing);

module.exports = router;