const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
 } = graphql;


module.exports = new GraphQLObjectType({
    name: "Tag",
    fields: () =>({
       tag_id: { type: GraphQLID },
       name: { type: GraphQLString }
    })
})