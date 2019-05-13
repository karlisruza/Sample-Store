const graphql = require('graphql');
// const pgp = require('pg-promise')();
const UserType = require('../Types/UserType');
const PackType = require('../Types/PackType');
const SampleType = require('../Types/SampleType');
const CommunityPackSamplesType = require('../Types/CommunityPackSamplesType');
const PackLikesType = require('../Types/PackLikesType');
const SampleLikesType = require('../Types/SampleLikesType');
const TagsType = require('../Types/TagsType');
const PackTagsType = require('../Types/PackTagsType');
const SampleTagsType = require('../Types/SampleTagsType');
const CommentType = require('../Types/CommentType');
const PackDownloadType = require('../Types/PackDownloadType');
const SampleDownloadType = require('../Types/SampleDownloadType');
const Models = require('../Sequelize/Models/index.js');

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         user: {
             type: UserType,
             args: { user_id: { type: GraphQLID }},
             resolve(parentValue, args){
                 return Models.users.findByPk(args.user_id)
                    .then(resp => {
                        console.log(resp);
                        return resp;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
             }
         },
         packs: {
             type: new GraphQLList(PackType),
             resolve(parentValue, args){
                return Models.packs.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         samples: {
            type: new GraphQLList(SampleType),
            args: { id: { type: GraphQLID}},
            resolve(parentValue, args){
                return Models.samples.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         sample: {
            type: SampleType,
            args: { id: { type: GraphQLID}},
            resolve(parentValue, args){
                return Models.samples.findByPk(args.id)
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         communitypacksamples: {
            type: new GraphQLList(CommunityPackSamplesType),
            resolve(parentValue, args){
                return Models.communitypacksamples.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         packlikes: {
            type: new GraphQLList(PackLikesType),
            resolve(parentValue, args){
                return Models.packlikes.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         samplelikes: {
            type: new GraphQLList(SampleLikesType),
            resolve(parentValue, args){
                return Models.samplelikes.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         tags: {
            type: new GraphQLList(TagsType),
            resolve(parentValue, args){
                return Models.tags.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         packtags: {
            type: new GraphQLList(PackTagsType),
            resolve(parentValue, args){
                return Models.packtags.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         sampletags: {
            type: new GraphQLList(SampleTagsType),
            resolve(parentValue, args){
                return Models.sampletags.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         comments: {
            type: new GraphQLList(CommentType),
            resolve(parentValue, args){
                return Models.comments.findAll()
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         packdownloads: {
             type: new GraphQLList(PackDownloadType),
             resolve(parentValue, args){
                 return Models.packdownloads.findAll()
                 .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });                 
             }
         },
         sampledownloads: {
             type: new GraphQLList(SampleDownloadType),
             resolve(parentValue, args){
                 return Models.sampledownloads.findAll()
                 .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });                 
             }
         }
     }
 })

 module.exports = new GraphQLSchema({
     query: RootQuery
 })

