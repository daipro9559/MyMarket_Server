'use strict'
module.exports = (sequelize, DataTypes) => {
    const Stand = sequelize.define('Stand',{
        standID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        description:{
            type:DataTypes.STRING
        },
        image:{// imagePath 
            allowNull:true,
            type:DataTypes.STRING
        },
        isFollowed: { // no have column this table, it will use check for item is marked
            type: DataTypes.VIRTUAL,
            defaultValue:false
          },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    Stand.associate = function(models){
        this.hasMany(models.Item,{foreignKey:'standID'})
        this.belongsTo(models.User,{foreignKey:'userID',onDelete: 'CASCADE', hooks: true})
        this.belongsTo(models.Address,{foreignKey:'addressID',onDelete: 'CASCADE', hooks: true})
        this.belongsTo(models.Category,{foreignKey:'categoryID'})
        this.hasMany(models.UserStandFollow,{foreignKey: 'standID'})

    }
    return Stand
}