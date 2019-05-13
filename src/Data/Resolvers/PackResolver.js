const Models = require('../Sequelize/Models/index.js');

module.exports = function packResolver(parentValue, args) {
    return Models.packs.findByPk(parentValue.pack_id)
        .then(data => {
            return data;
        })
        .catch(err => {
            return 'error: ', err;
        });
}
