const graphql = require('graphql');
const isoDate = require('graphql-iso-date')

const UserType = require('./UserType');
const PackType = require('./PackType');
const userResolver = require('../Resolvers/UserResolver');
const packResolver = require('../Resolvers/PackResolver');



const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
 } = graphql;
 const { GraphQLDateTime } = isoDate;

module.exports = new GraphQLObjectType({
    name: "Comment",
    fields: () =>({
       comment_id: { type: GraphQLID },
       user_id: {
           type: UserType,
           resolve(parentValue, args){
              return userResolver(parentValue);
           }
       },
       title: { type: GraphQLString },
       body: { type: GraphQLString },
       rating: { type: GraphQLInt },
       pack_id: {
        type: PackType,
        resolve(parentValue, args){
           return packResolver(parentValue);
        }
       },
       created_on: { type: GraphQLDateTime },
    })
})