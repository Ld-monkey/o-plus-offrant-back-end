require('dotenv').config();

const express = require('express');
const router = require('./app/routers');
const expressJSDocSwagger = require('express-jsdoc-swagger');

//---------------------------------------------------------------------------

const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: '/public/images/' });

//---------------------------------------------------------------------------

const port = process.env.PORT || 3000;

const swaggerOptions = {
  info: {
    version: '1.0',
    title: 'O+Offrant',
  },
  baseDir: `${__dirname}/app`,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

const app = express();


/*
const mySwagger = expressJSDocSwagger(app)
mySwagger(swaggerOptions);
*/
expressJSDocSwagger(app)(swaggerOptions);



// Middleware pour autoriser les demandes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(router);
//------------------------------------------------------------------------

// app.use('/images', express.static('images'))
app.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

app.post('/api/images', upload.single('image'), (req, res) => {
  const imageName = req.file.filename
  const description = req.body.description

  // Save this data to a database probably

  console.log(description, imageName)
  res.send({description, imageName})
})

//--------------------------------------------------------------------------

app.listen(port, ()=>{
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});

