'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Items',
      'needToSale',{
        type:Sequelize.BOOLEAN // true -> need sale, false -> need buy
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Items', // name of Source model
      'needToSale' // key we want to remove
    )
  }
};
