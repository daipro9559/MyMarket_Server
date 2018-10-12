'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.createTable('Provinces', {
    //   provinceID: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   provinceName: {
    //     type: Sequelize.STRING
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
    // return queryInterface.dropTable('Provinces');
  }
};