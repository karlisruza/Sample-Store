const db = require('../Sequelize/Sequelize');

module.exports = function userResolver(parentValue, args) {
    console.log(parentValue.user_id);
    const query = `SELECT * FROM "packs" WHERE user_id='${parentValue.pack_id}'`;
    return db.conn.one(query)
        .then(data => {
            return data;
        })
        .catch(err => {
            return 'error: ', err;
        });
}
