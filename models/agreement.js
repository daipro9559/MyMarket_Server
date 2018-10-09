'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agreement = sequelize.define('Agreement', {
    priceAgreement: DataTypes.FLOAT
  }, {});
  Agreement.associate = function(models) {
    // associations can be defined here
  };
  return Agreement;
};