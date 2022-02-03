const express = require('express');
const router = express.Router();

// controller
const { register, login } = require('../controllers/auth');
const { 
  getUsers, 
  editUser, 
  deleteUser,
  addFollows, 
  getFollowers, 
  getFollowing
} = require('../controllers/user');
const {
  addFeed,
  getFeedByFollow,
  getAllFeed,
  addLike,
  getComments,
  addComment
} = require('../controllers/feed');
const { addMessage, getMessage } = require('../controllers/message');

// middleware
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// auth route
router.post('/register', register);
router.post('/login', login);

// user route
router.get('/users', getUsers);
router.patch('/user/:id', auth, editUser);
router.delete('/user/:id', deleteUser);
router.patch('/follow', addFollows);
router.get('/followers/:id', getFollowers);
router.get('/followings/:id', getFollowing);

// feed route
router.post('/feed', auth, uploadFile('fileName'), addFeed);
router.get('/feed/:id', auth, getFeedByFollow);
router.get('/feeds', getAllFeed);
router.post('/like', auth, addLike);
router.get('/comments/:id', auth, getComments);
router.post('/comment', auth, addComment);

// message route
router.post('/message/:id', auth, addMessage);
router.get('/feed/:id', auth, getMessage);

module.exports = router;