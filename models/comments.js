'use strict'
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment',{
        commentID:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        comment:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    Comment.associate = function(models){
        this.belongsTo(models.User,{foreignKey:'userID',onDelete: 'CASCADE', hooks: true})
        this.belongsTo(models.Stand,{foreignKey:'standID',onDelete: 'CASCADE', hooks: true})
    }
    return Comment
}