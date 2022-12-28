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
        queryInterface.addColumn('Products', 'quantity', {
          type: Sequelize.DataTypes.INTEGER
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
        queryInterface.removeColumn('Products', 'quantity', { transaction: myTransaction }),
      ]);
    });
  }
};
