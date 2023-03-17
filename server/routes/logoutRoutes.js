const express = require('express');

const route = express.Router();

const logoutUser = require('../controllers/logoutController');

route.get('/', logoutUser);

module.exports = route;
