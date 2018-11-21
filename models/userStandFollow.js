'use strict'
module.exports = (sequelize, DataTypes) => {
    const UserStandFollow = sequelize.define('UserStandFollow',{
        standID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },{});
    UserStandFollow.associate = function(models){
        this.belongsTo(models.User,{foreignKey:'userID'})
        this.belongsTo(models.Stand,{foreignKey:'standID'})
    }
    return UserStandFollow
}