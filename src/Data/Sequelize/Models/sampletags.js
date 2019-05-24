const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('sampletags', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      sample_id: {
        type: Sequelize.UUID,
        allowNull: false
      },   
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false
      }
    },{
          timestamps: false,
});
      