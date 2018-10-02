'use strict'
const fs = require('fs')
const path= require('path')
const Sequelize = require('sequelize')
const CONFIG = require('../config/conf')
const basename = path.basename(__filename)
const DBConfig = require('../config/config.json')[CONFIG.env]
let db ={}



const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: DBConfig.dialect,
  port:CONFIG.db_port,
  operatorsAliases:false,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
