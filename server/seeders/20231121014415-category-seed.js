'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Aksesoris Anjing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Makanan Anjing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aksesoris Kucing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Makanan Kucing',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {})
  }
};
