/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment, Article }) {
      this.hasMany(Comment, { foreignKey: 'user_id' }, {
        onDelete: 'cascade',
        hooks: true,
      });
      this.hasMany(Article, { foreignKey: 'user_id' }, {
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
