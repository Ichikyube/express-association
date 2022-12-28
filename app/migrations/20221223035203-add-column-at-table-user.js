'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.sequelize.transaction(myTransaction => {
      return Promise.all([
        queryInterface.addColumn('Users', 'username', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: myTransaction }),

        queryInterface.addColumn('Users', 'password', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: myTransaction }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.sequelize.transaction(myTransaction => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'username', { transaction: myTransaction }),
        queryInterface.removeColumn('Users', 'password', { transaction: myTransaction })
      ]);
    });
  }
};
