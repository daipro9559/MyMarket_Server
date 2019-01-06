'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {

    location: {
       type: DataTypes.GEOMETRY('POINT'),
       allowNull: true
    },
    // distance: { // no have column this table, it will use check for item is marked
    //   type: DataTypes.VIRTUAL,
    //   defaultValue:0
    // },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
 
  return Test;
};