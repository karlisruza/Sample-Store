const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('packs', {
      pack_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      community: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false
      },
      created_on: {
          type: Sequelize.DATE,
          allowNull: false
      },
      demo_path: {
          type: Sequelize.STRING,
          allowNull: false
      },
      img_path: {
          type: Sequelize.STRING,
      }
    },{
          timestamps: false,
          // underscored: true
});
      