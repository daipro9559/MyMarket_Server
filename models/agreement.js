'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agreement = sequelize.define('Agreement', {
    priceAgreement: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Agreement.associate = function(models) {
    // associations can be defined here
  };
  return Agreement;
};