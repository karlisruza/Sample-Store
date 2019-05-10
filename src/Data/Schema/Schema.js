
const graphql = require('graphql');
const pgp = require('pg-promise')();
const Config = require('../../config.js');
const isoDate = require('graphql-iso-date')

const db = {};
db.conn = pgp(Config.DBConfig);

const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLInt
 } = graphql;
 const { GraphQLDateTime } = isoDate;

 function userResolve(parentValue, args) {
    console.log(parentValue.user_id);
    const query = `SELECT * FROM "users" WHERE user_id='${parentValue.user_id}'`;
    return db.conn.one(query)
        .then(data => {
            return data;
        })
        .catch(err => {
            return 'error: ', err;
        });
}

 const UserType = new GraphQLObjectType({
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

 const PackType = new GraphQLObjectType({
     name: "Pack",
     fields: () =>({
        pack_id: { type: GraphQLID },
        name: { type: GraphQLString },
        user_id: {
            type: UserType,
            resolve(parentValue, args){
               return userResolve(parentValue, args); 
            }
        },
        price: { type: GraphQLInt },
        community: { type: GraphQLBoolean },
        created_on: { type: GraphQLDateTime },
        demo_path: { type: GraphQLString },
        img_path: { type: GraphQLString },
     })
 })

 const SampleType = new GraphQLObjectType({
     name: "Sample",
     fields: () =>({
         sample_id: { type: GraphQLID },
         name: { type: GraphQLString },
         user_id: {
             type: UserType,
             resolve(parentValue, args){
                return userResolve(parentValue, args); 
             }
         },
         price: { type: GraphQLInt },
         created_on: { type: GraphQLDateTime },
         sample_path: { type: GraphQLString },
         key: { type: GraphQLString },
         bpm: { type: GraphQLInt }
     })
 })

 const PackSamplesType = new GraphQLObjectType({
     name: "PackSample",
     fields: () =>({
        id: { type: GraphQLID },
        sample_id:{
            type: SampleType,
            resolve(parentValue, args){
                const query = `SELECT * FROM "samples" WHERE sample_id='${parentValue.sample_id}'`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
            }
        },
        pack_id: {
            type: PackType,
            resolve(parentValue, args){
                const query = `SELECT * FROM "packs" WHERE pack_id='${parentValue.pack_id}'`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
            }
        }
        })
 })
 const LikesType = new GraphQLObjectType({
     name: "Likes",
     fields: () =>({
        id: { type: GraphQLID },
        sample_id:{
            type: SampleType,
            resolve(parentValue, args){
                const query = `SELECT * FROM "samples" WHERE sample_id='${parentValue.sample_id}'`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
            }
        },
        pack_id: {
            type: PackType,
            resolve(parentValue, args){
                const query = `SELECT * FROM "packs" WHERE pack_id='${parentValue.pack_id}'`;
                return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
            }
        },
        user_id: {
            type: UserType,
            resolve(parentValue, args){
               return userResolve(parentValue, args); 
            }
        }
     })
 })

 const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         user: {
             type: UserType,
             args: { id: { type: GraphQLID }},
             resolve(parentValue, args){
                //  const query = `SELECT * FROM "users"`;
                 const query = `SELECT * FROM "users" WHERE id=${args.id}`;
                 return db.conn.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'error: ', err;
                    });
             }
         },
         pack: {
             type: PackType,
             args: { id: { type: GraphQLID }},
             resolve(parentValue, args){
                const query = `SELECT * FROM "packs" WHERE id=${args.id}`;
                return db.conn.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });
             }
         },
         packs: {
            type: new GraphQLList(PackType),
            resolve(parentValue, args){
                    const query = `SELECT * FROM "packs"`;
                    return db.conn.one(query)
                    .then(data => {
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
            resolve(){
                const query = `SELECT * FROM "samples"`;
                return db.conn.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });                
            }
         },
         packsample: {
             type: PackSamplesType,
             resolve(){
                const query = `SELECT * FROM "packsamples"`;
                return db.conn.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'error: ', err;
                });                
            }
         },
         likes: {
            type: LikesType,
            resolve(){
               const query = `SELECT * FROM "likes"`;
               return db.conn.one(query)
               .then(data => {
                   return data;
               })
               .catch(err => {
                   return 'error: ', err;
               });                
           }
       },
     }
 })

 module.exports = new GraphQLSchema({
     query: RootQuery
 })