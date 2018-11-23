'use strict'
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notifications',{
        notificationID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
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
        this.belongsTo(models.User,{foreignKey:'userID',onDelete: 'CASCADE'})
        this.belongsTo(models.Category,{foreignKey:'categoryID'})
        this.hasMany(models.UserStandFollow,{foreignKey: 'standID'})
    }
    return Notification
}