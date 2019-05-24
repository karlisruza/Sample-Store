const graphql = require('graphql');
const TagsType = require('./TagsType')
const SampleType = require('./SampleType')
const tagsResolver = require('../Resolvers/TagResolver');
const sampleResolver = require('../Resolvers/SampleResolver');

const {
    GraphQLObjectType,
    GraphQLID,
 } = graphql;


module.exports = new GraphQLObjectType({
    name: "SampleTag",
    fields: () =>({
        id: { type: GraphQLID },
        sample_id: {
            type: SampleType,
            resolve(parentValue, args){
                return sampleResolver(parentValue);
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
