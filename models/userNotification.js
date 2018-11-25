'use strict'
module.exports = (sequelize, DataTypes) => {
    const UserNotification = sequelize.define('UserNotification',{
        notificationID:{
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
    UserNotification.associate = function(models){
        this.belongsTo(models.User,{foreignKey:'userID',onDelete: 'CASCADE'})
        this.belongsTo(models.Notification,{foreignKey:'notificationID',onDelete: 'CASCADE'})
    }
    return UserNotification
}