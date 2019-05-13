const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('samples', {
      sample_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false
      },
      price: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      pack_id:{
        type: Sequelize.UUID,
        allowNull: false
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sample_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
      },
      bpm: {
        type: Sequelize.INTEGER,
      }
    },{
          timestamps: false,
});
      