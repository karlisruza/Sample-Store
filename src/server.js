const express = require('express');
const path = require('path');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./Data/Schema/Schema.js');
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'build')));

//TEST
app.get('/ping', function (req, res) {
 return res.send('pong');
});
//ENABLE CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
//GraphQL
// app.use('/graphql', cors(), bodyParser.json(), expressGraphQL((req) => {
//   return {
//     schema,
//     context: {
//       user: req.user
//     }
//   };
// }));

var graphqlHTTP = require("express-graphql");
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
  })
);


app.listen(process.env.PORT || 8080, () => {
  console.log("Listening on Port 8080");
});