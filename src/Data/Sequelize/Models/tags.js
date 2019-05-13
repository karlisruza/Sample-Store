const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('tags', {
      tag_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },{
          timestamps: false,
      });

      
