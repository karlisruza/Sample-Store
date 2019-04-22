
const graphql = require('graphql');
const pgp = require('pg-promise')();
const Config = require('../../config.js');

const db = {};
db.conn = pgp(Config.DBConfig);

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
 } = graphql;

 const UserType = new GraphQLObjectType({
     name: "User",
     fields: () =>({
        user_id: { type: GraphQLID},
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        pass: { type: GraphQLString }
     })
 })

 const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         user: {
             type: UserType,
            //  args: { id: { type: GraphQLID }},
             resolve(parentValue, args){
                 const query = `SELECT * FROM "users"`;
                //  const query = `SELECT * FROM "users" WHERE id=${args.id}`;
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