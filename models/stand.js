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
        }
    });
    Stand.associate = function(models){
        this.hasMany(models.Item,{foreignKey:'standID'})
        this.belongsTo(models.User,{foreignKey:'userID',onDelete: 'CASCADE'})
        this.belongsTo(models.Address,{foreignKey:'addressID'})
        this.belongsTo(models.Category,{foreignKey:'categoryID'})
    }
    return Stand
}