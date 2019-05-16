const express = require('express');
const path = require('path');
const app = express();
const schema = require('./Data/Schema/Schema.js');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./Data/Sequelize/Sequelize');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

var graphqlHTTP = require("express-graphql");
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening on Port 8080");
});