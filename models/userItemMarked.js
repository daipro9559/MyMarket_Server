'use strict'
module.exports = (sequelize, DataTypes) => {
    const UserItemMarked = sequelize.define('UserItemMarked',{
        itemID:{
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
    UserItemMarked.associate = function(models){
        this.belongsTo(models.User,{foreignKey:'userID'})
        this.belongsTo(models.Item,{foreignKey:'itemID'})
    }
    return UserItemMarked
}