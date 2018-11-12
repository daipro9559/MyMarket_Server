'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryID:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    categoryName: {
      type:DataTypes.STRING
    },
    imagePath:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, 
  {});
  Category.associate = function(models) {
    this.hasMany(models.Item, {foreignKey: 'categoryID'})
    // associations can be defined here
  };
  return Category;
};