const graphql = require('graphql');
const UserType = require('./UserType')
const SampleType = require('./SampleType')
const userResolver = require('../Resolvers/UserResolver');
const sampleResolver = require('../Resolvers/SampleResolver');

const {
    GraphQLObjectType,
    GraphQLID,
 } = graphql;


module.exports = new GraphQLObjectType({
    name: "SampleDownload",
    fields: () =>({
        id: { type: GraphQLID },
        user_id: {
            type: UserType,
            resolve(parentValue, args){
                return userResolver(parentValue);
            }
        },
        sample_id: {
            type: SampleType,
            resolve(parentValue, args){
                return sampleResolver(parentValue);
            }
        },
    })
})
