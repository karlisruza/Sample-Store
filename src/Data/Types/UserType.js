const graphql = require('graphql');
const isoDate = require('graphql-iso-date')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
 } = graphql;
 const { GraphQLDateTime } = isoDate;

module.exports = new GraphQLObjectType({
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
