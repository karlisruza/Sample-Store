const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('samplelikes', {
      like_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      sample_id: {
        type: Sequelize.UUID,
        allowNull: false
      }
    },{
          timestamps: false,
});
      