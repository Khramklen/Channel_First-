/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const { articles } = require('../fixtures/articles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', articles, {});
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {
      truncate: true,
      cascade: true,
    });
  },
};
