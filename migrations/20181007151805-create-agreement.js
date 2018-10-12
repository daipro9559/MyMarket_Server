'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.createTable('Agreements', {
    //   agreementID: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   priceAgreement: {
    //     type: Sequelize.FLOAT
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.dropTable('Agreements');
  }
};