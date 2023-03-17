/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';
const { comments } = require('../fixtures/comments');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {
      truncate: true,
      cascade: true,
    });
  },
};
