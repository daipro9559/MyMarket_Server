'use strict'
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification',{
        notificationID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        // type =  : notification from user, type = 2: notification from stand
        type:{
            type:DataTypes.INTEGER, 
            allowNull:false,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        body:{// imagePath 
            allowNull:false,
            type:DataTypes.STRING
        },
        icon:{
            allowNull:false,
            type:DataTypes.STRING
        },
        data:{
            allowNull:false,
            type:DataTypes.STRING
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    Notification.associate = function(models){
        this.belongsToMany(models.User, {through: 'UserNotifications',foreignKey: 'notificationID'})
    }
    return Notification
}