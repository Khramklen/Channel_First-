const { Article, Comment, User } = require('../db/models');

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ include: [{ model: Comment, include: [{ model: User, attributes: ['email', 'id'] }] }] }, { raw: true });
    res.send({ status: 'ok', data: articles });
  } catch (error) {
    console.log('ERROR==>', error);
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ include: [{ model: Comment, include: [{ model: User, attributes: ['email', 'id'] }] }] }, { raw: true });
    // eslint-disable-next-line radix
    const page = parseInt(req.query.page);
    // eslint-disable-next-line radix
    const limit = parseInt(req.query.limit);
    const startPage = (page - 1) * limit;
    const lastPage = (page) * limit;

    const results = {};
    results.totalArticle = articles.length;
    // eslint-disable-next-line space-infix-ops
    results.pageCount = Math.ceil(articles.length / limit);

    if (lastPage < articles.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startPage > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = articles.slice(startPage, lastPage);

    await res.json(results);
  } catch (error) {
    console.log('ERROR==>', error);
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.body;
  await Article.destroy({ where: { id } });
  res.sendStatus(200);
};

module.exports = {
  getArticles,
  deleteArticle,
  getAllArticles,
};
