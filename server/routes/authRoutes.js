const express = require('express');

const route = express.Router();
const { authUser } = require('../controllers/authController');

route.get('/', authUser);
route.post('/', authUser);

module.exports = route;
