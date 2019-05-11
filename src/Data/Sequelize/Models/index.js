const users = require('./users');
const packs = require('./users');
const sequelize = require('../Sequelize.js');

users.packs = users.hasMany(packs, {
    foreignKey: 'user_id',
    as: 'user',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

packs.user = packs.belongsTo(users, {
    foreignKey: 'user_id',
    as: 'packs',
    onUpdate: 'cascade',
    onDelete: 'cascade',
  });

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured");
});

module.exports = {users, packs};


