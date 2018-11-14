'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  //  queryInterface.addColumn(
  //     'Users',
  //     'tokenFirebase',
  //     {
  //       type: Sequelize.STRING,
  //       allowNull: false,
  //       unique: true
  //     }
  //   )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
