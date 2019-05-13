const graphql = require('graphql');
const TagsType = require('./TagsType')
const PackType = require('./PackType')
const tagsResolver = require('../Resolvers/TagResolver');
const packResolver = require('../Resolvers/PackResolver');

const {
    GraphQLObjectType,
    GraphQLID,
 } = graphql;


module.exports = new GraphQLObjectType({
    name: "Packtag",
    fields: () =>({
        id: { type: GraphQLID },
        pack_id: {
            type: PackType,
            resolve(parentValue, args){
                return packResolver(parentValue);
            }
        },
        tag_id: {
            type: TagsType,
            resolve(parentValue, args){
                return tagsResolver(parentValue);
            }
        },
    })
})
