const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('users', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      coins: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      img_path: {
          type: Sequelize.STRING
      },
      created_on: {
          type: Sequelize.DATE,
          allowNull: false
      }
    },{
          timestamps: false,
      });

      
