'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const process = require('process');
const basename = 'index.js';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const pg = require('pg')
const models = process.cwd() + '/src/db/models/' || __dirname;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {...config, dialectModule: pg});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {...config, dialectModule: pg});
}

fs
  .readdirSync(models)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(__dirname + '/' + file)(sequelize, Sequelize.DataTypes);
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
