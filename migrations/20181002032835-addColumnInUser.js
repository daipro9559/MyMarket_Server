'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.addColumn(
      'Users',
      'code',
      Sequelize.INTEGER
    ),
    queryInterface.addColumn(
      'Users',
      'codeExp',
      Sequelize.INTEGER
    )];
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
