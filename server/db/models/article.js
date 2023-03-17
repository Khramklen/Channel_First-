/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate({ Comment, User }) {
      this.hasMany(Comment, { foreignKey: 'article_id' }, {
        onDelete: 'cascade',
        hooks: true,
      });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Article.init({
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
