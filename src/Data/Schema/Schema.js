
const graphql = require('graphql');
const pgp = require('pg-promise')();
const Config = require('../../config.js');
const isoDate = require('graphql-iso-date')

const db = {};
db.conn = pgp(Config.DBConfig);

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLInt
 } = graphql;

 const { GraphQLDateTime } = isoDate;

 const UserType = new GraphQLObjectType({
     name: "User",
     fields: () =>({
        user_id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        coins: { type: GraphQLInt },
        img_path: { type: GraphQLString },
        created_on: { type: GraphQLDateTime }
     })
 })

 const PackType = new GraphQLObjectType({
     name: "Pack",
     fields: () =>({
        pack_id: { type: GraphQLID },
        name: { type: GraphQLString },
        user_id: {
            type: UserType,
            resolve(parentValue, args) {
                console.log(parentValue.user_id);
                const query = `SELECT * FROM "users" WHERE user_id='${parentValue.user_id}'`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
            }
        },
        price: { type: GraphQLInt },
        community: { type: GraphQLBoolean },
        created_on: { type: GraphQLDateTime },
        demo_path: { type: GraphQLString },
        img_path: { type: GraphQLString },
     })
 })

 const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         user: {
             type: UserType,
             args: { id: { type: GraphQLID }},
             resolve(parentValue, args){
                //  const query = `SELECT * FROM "users"`;
                 const query = `SELECT * FROM "users" WHERE id=${args.id}`;
                 return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
             }
         },
         pack: {
             type: PackType,
             args: { id: { type: GraphQLID }},
             resolve(parentValue, args){
                const query = `SELECT * FROM "packs"`;
                return db.conn.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         }
     }
 })

 module.exports = new GraphQLSchema({
     query: RootQuery
 })