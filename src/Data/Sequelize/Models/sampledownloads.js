const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('sampledownloads', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      sample_id: {
        type: Sequelize.UUID,
        allowNull: false
      },   
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      }
    },{
          timestamps: false,
});
      