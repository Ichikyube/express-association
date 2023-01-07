'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("(now() at time zone 'utc')"), 
        field: 'createdAt'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        field: 'updatedAt'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};