const Models = require('../Sequelize/Models/index.js');

module.exports = function userResolver(parentValue) {
    return Models.users.findByPk(parentValue.user_id)
    .then(resp => {
      console.log(resp);
      return resp;
    })
    .catch(err => {
      return 'error: ', err;
    });
}
