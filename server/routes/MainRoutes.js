const express = require('express');

const route = express.Router();

const { getArticles, deleteArticle, getAllArticles } = require('../controllers/mainController');

route
  .get('/', getAllArticles)
  .get('/paginate', getArticles)
  .delete('/article', deleteArticle);

module.exports = route;
