const graphql = require('graphql');
// const pgp = require('pg-promise')();


const UserType = require('../Types/UserType');
const PackType = require('../Types/PackType');
const SampleType = require('../Types/SampleType');

const Models = require('../Sequelize/Models/index.js');


const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         user: {
             type: UserType,
             args: { user_id: { type: GraphQLID }},
             resolve(parentValue, args){
                 return Models.users.findByPk(args.user_id)
                    .then(resp => {
                        return resp;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
             }
         },
         packs: {
             type: new GraphQLList(PackType),
             resolve(parentValue, args){
                return Models.packs.findAll({
                    include: [{
                        model: Models.users, as: 'user'
                    }]
                })
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
        //  sample: {
        //     type: SampleType,
        //     args: { id: { type: GraphQLID}},
        //     resolve(){
        //         const query = `SELECT * FROM "samples"`;
        //         return db.conn.one(query)
        //         .then(data => {
        //             return data;
        //         })
        //         .catch(err => {
        //             return 'error: ', err;
        //         });                
        //     }
        //  },
     }
 })

 module.exports = new GraphQLSchema({
     query: RootQuery
 })