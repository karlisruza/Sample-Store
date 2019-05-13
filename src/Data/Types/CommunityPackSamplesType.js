const packResolver = require('../Resolvers/PackResolver');
const sampleResolver = require('../Resolvers/SampleResolver');
const PackType = require('./PackType');
const SampleType = require('./SampleType');

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
    name: "CommunityPackSamples",
    fields: () =>({
       id: { type: GraphQLID },
       sample_id: {
        type: SampleType,
        resolve(parentValue, args){
           return sampleResolver(parentValue);
        }
         },
       pack_id: {
           type: PackType,
           resolve(parentValue, args){
              return packResolver(parentValue);
           }
       },
    })
})