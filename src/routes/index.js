const express = require('express');
const router = express.Router();

// controller
const { register } =require('../controllers/auth')

// middleware
const { auth } = require('../middlewares/auth')

// route
router.post('/register', register);

module.exports = router;