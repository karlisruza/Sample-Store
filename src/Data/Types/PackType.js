const userResolver = require('../Resolvers/UserResolver');
const UserType = require('./UserType');

const graphql = require('graphql');
const isoDate = require('graphql-iso-date')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
 } = graphql;
 const { GraphQLDateTime } = isoDate;

module.exports = new GraphQLObjectType({
    name: "Pack",
    fields: () =>({
       pack_id: { type: GraphQLID },
       name: { type: GraphQLString },
       user_id: {
           type: UserType,
           resolve(parentValue, args){
              return userResolver(parentValue.user_id);
           }
       },
       price: { type: GraphQLInt },
       community: { type: GraphQLBoolean },
       created_on: { type: GraphQLDateTime },
       demo_path: { type: GraphQLString },
       img_path: { type: GraphQLString },
    })
})