const userResolver = require('../Resolvers/UserResolver');
const UserType = require('./UserType');
const Models = require('../Sequelize/Models')
const sequelize = require('sequelize')

const graphql = require('graphql');
const isoDate = require('graphql-iso-date')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
 } = graphql;
 const { GraphQLDateTime } = isoDate;

module.exports = new GraphQLObjectType({
    name: "Pack",
    fields: () =>({
       pack_id: { type: GraphQLID },
       name: { type: GraphQLString },
       user_id: {
           type: UserType,
           resolve(parentValue, args){
              return userResolver(parentValue);
           }
       },
       price: { type: GraphQLInt },
       community: { type: GraphQLBoolean },
       created_on: { type: GraphQLDateTime },
       demo_path: { type: GraphQLString },
       img_path: { type: GraphQLString },
       rating: { 
           type: GraphQLFloat,
           resolve(parentValue, args){
               return Models.comments.findAll({
                attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg_rating']],
                where: {
                    pack_id: parentValue.pack_id
                },
                raw: true
               })
               .then(resp => {
                    return resp[0].avg_rating;
              })
              .catch(err => {
                return 'error: ', err;
              });
           }
        },
        description: { type: GraphQLString }
    })
})