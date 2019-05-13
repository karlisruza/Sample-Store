const sequelize = require('../Sequelize.js');

const users = require('./users');
const packs = require('./packs');
const samples = require('./samples');
const communitypacksamples = require('./communitypacksamples');
const packlikes = require('./packlikes');
const samplelikes = require('./samplelikes');
const tags = require('./tags');
const packtags = require('./packtags');
const sampletags = require('./sampletags');
const comments = require('./comments');
const packdownloads = require('./packdownloads');
const sampledownloads = require('./sampledownloads');

// users.packs = users.hasMany(packs, {
//     foreignKey: 'user_id',
//     as: 'user',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
// });

// packs.user = packs.belongsTo(users, {
//     foreignKey: 'user_id',
//     as: 'users',
//     onUpdate: 'cascade',
//     onDelete: 'cascade',
//   });

sequelize.sync({force: false}).then(function () {
    console.log("Database Configured");
});

module.exports = {
    users,
    packs,
    samples,
    communitypacksamples,
    packlikes,
    samplelikes,
    tags,
    packtags,
    sampletags,
    comments,
    packdownloads,
    sampledownloads
};


