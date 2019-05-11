const config = require('../../config');
const Sequelize = require('sequelize');
const { DBConfig } = config;

module.exports = new Sequelize(DBConfig.database, DBConfig.user, DBConfig.password, {
  host: DBConfig.host,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
});