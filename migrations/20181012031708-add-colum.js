'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'userType',{
        type:Sequelize.INTEGER, // true -> need sale, false -> need buy
        allowNull:false,
        defaultValue:0
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Items', // name of Source model
      'userType' // key we want to remove
    )
  }
};
