const graphql = require('graphql');
const UserType = require('./UserType')
const PackType = require('./PackType')
const userResolver = require('../Resolvers/UserResolver');
const packResolver = require('../Resolvers/PackResolver');

const {
    GraphQLObjectType,
    GraphQLID,
 } = graphql;


module.exports = new GraphQLObjectType({
    name: "PackLike",
    fields: () =>({
        like_id: { type: GraphQLID },
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
        }
    })
})
