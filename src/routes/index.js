const express = require('express');
const router = express.Router();

// controller
const { register, login } =require('../controllers/auth')

// middleware
const { auth } = require('../middlewares/auth')

// route
router.post('/register', register);
router.post('/login', login);

module.exports = router;