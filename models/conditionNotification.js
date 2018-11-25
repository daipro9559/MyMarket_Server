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
        },
        districtID:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        provinceID:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    ConditionNotify.associate = function(models){
        this.belongsTo(models.User, {foreignKey:'userID'})
    }
    return ConditionNotify
}