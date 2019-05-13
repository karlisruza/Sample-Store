const db = require('../Sequelize.js');
const Sequelize = require('sequelize');

module.exports = db.define('comments', {
      comment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      user_id:{
        type: Sequelize.UUID,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
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
    },{
          timestamps: false,
});
      