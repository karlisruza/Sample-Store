const Models = require('../Sequelize/Models/index.js');

module.exports = function sampleResolver(parentValue) {
    return Models.samples.findByPk(parentValue.sample_id)
    .then(resp => {
      console.log(resp);
      return resp;
    })
    .catch(err => {
      return 'error: ', err;
    });
}
