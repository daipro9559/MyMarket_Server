'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userRoleID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    userRoleName: DataTypes.STRING
  }, {});
  UserRole.associate = function(models) {
    this.hasOne(models.User,{foreignKey: 'userRoleID'})
    // associations can be defined here
  };
  return UserRole;
};