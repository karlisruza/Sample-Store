const express = require('express');
const app = express();
const schema = require('./Data/Schema/Schema.js');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./Data/Sequelize/Sequelize');
const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const uuid = require('uuid/v4');
const mime = require('mime-types');

process.env.GOOGLE_APPLICATION_CREDENTIALS = '../keys/sample-shop-be53f32e74d1.json';
const storage = new Storage();
const bucketName = 'sample__shop';
const bucket = storage.bucket('sample__shop');

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
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
});


app.post('/uploadpack', upload.single('files'), function(req, res, next){
  const id = uuid();
  const type = mime.lookup(req.file.originalname);
  console.log(req.file);

  const blob = bucket.file(`${id}.${mime.extensions[type][0]}`);
  const stream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
	stream.on('error', err => {
		next(err);
	});
	stream.on('finish', () => {
		res.status(200).json({
			data: {
        id: id,
        path: `https://storage.googleapis.com/${bucketName}/${id}.${mime.extensions[type][0]}`
			},
		});
	});
	stream.end(req.file.buffer);
})

app.get('/uploadpack/:filepath', function(req, res){
  // console.log(req);
  var file = bucket.file(req.params.filepath);
  file.download({
    destination: '/home/kr/Desktop'
  }, function(err) {});
})

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