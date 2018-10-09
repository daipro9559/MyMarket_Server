'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryID:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryName: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    this.hasMany(models.Item, {foreignKey: 'categoryID'})
    // associations can be defined here
  };
  return Category;
};