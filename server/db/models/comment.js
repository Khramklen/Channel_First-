/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Article }) {
      this.belongsTo(Article, { foreignKey: 'article_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Comment.init({
    article_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
