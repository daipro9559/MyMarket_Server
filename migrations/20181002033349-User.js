'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      phone:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
      },
      password:{
        type:Sequelize.STRING,
      },
      code:{
        type:Sequelize.INTEGER
      },
      codeExp:{
        type:Sequelize.BIGINT	
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
    return queryInterface.dropTable('Users');
  }
};