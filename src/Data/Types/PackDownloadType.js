const graphql = require('graphql');
const UserType = require('./UserType')
const SampleType = require('./SampleType')
const userResolver = require('../Resolvers/UserResolver');
const packResolver = require('../Resolvers/PackResolver');

const {
    GraphQLObjectType,
    GraphQLID,
 } = graphql;

module.exports = new GraphQLObjectType({
    name: "PackDownload",
    fields: () =>({
        id: { type: GraphQLID },
        user_id: {
            type: UserType,
            resolve(parentValue, args){
                return userResolver(parentValue);
            }
        },
        pack_id: {
            type: SampleType,
            resolve(parentValue, args){
                return packResolver(parentValue);
            }
        },
    })
})
