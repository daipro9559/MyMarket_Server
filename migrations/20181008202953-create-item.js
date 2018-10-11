'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      itemID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      description:{
        type:Sequelize.TEXT({length:'medium'})
      },
      categoryID:{
        type:Sequelize.INTEGER,
        references:{
          model:'Categories',
          key:'categoryID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      addressID:{
        type:Sequelize.INTEGER,
        references:{
          model:'Addresses',
          key:'addressID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      userID:{
        type:Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'userID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};