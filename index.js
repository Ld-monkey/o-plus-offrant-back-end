require('dotenv').config();

const express = require('express');
const router = require('./app/routers');
const expressJSDocSwagger = require('express-jsdoc-swagger');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(router);

app.listen(port, ()=>{
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});

