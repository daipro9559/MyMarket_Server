'use strict'
module.exports = (sequelize, DataTypes) => {
    const ConditionNotify = sequelize.define('ConditionNotify',{
        conditionID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        isEnable:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true                     
        },
        radius:{
            type:DataTypes.FLOAT,
            allowNull:true,
            defaultValue:10
        },
        districtID:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:1
        },
        provinceID:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:1
        },
        categoryID:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:1
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    ConditionNotify.associate = function(models){
        this.belongsTo(models.User, {foreignKey:'userID'})
        this.belongsTo(models.District, {foreignKey:'districtID'})
        this.belongsTo(models.Province, {foreignKey:'provinceID'})
        this.belongsTo(models.Category, {foreignKey:'categoryID'})

    }
    return ConditionNotify
}