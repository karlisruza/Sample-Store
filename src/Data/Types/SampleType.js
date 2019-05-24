const UserType = require( './UserType');
const PackType = require( './PackType');
const userResolver = require( '../Resolvers/UserResolver');
const packResolver = require( '../Resolvers/PackResolver');

const graphql = require('graphql');
const isoDate = require('graphql-iso-date')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
 } = graphql;
 const { GraphQLDateTime } = isoDate;

module.exports = new GraphQLObjectType({
     name: "Sample",
     fields: () =>({
         sample_id: { type: GraphQLID },
         name: { type: GraphQLString },
         user_id: {
             type: UserType,
             resolve(parentValue, args){
                return userResolver(parentValue); 
             }
         },
         pack_id: {
             type: PackType,
             resolve(parentValue, args){
                 return packResolver(parentValue);
             }
        },
         price: { type: GraphQLInt },
         created_on: { type: GraphQLDateTime },
         sample_path: { type: GraphQLString },
         key: { type: GraphQLString },
         bpm: { type: GraphQLInt }
     })
 })
