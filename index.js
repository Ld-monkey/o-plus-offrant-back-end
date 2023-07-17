require('dotenv').config();

const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const { Server } = require('http');
const socket = require('socket.io');
const router = require('./app/routers');

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

// Connect server to socket.io.
const server = Server(app);
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  },
});

// const mySwagger = expressJSDocSwagger(app)
// mySwagger(swaggerOptions);
expressJSDocSwagger(app)(swaggerOptions);

/**
 * Express
 */

// Middleware pour autoriser les demandes CORS.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

/**
 * Socket.io
 */
io.on('connection', (data) => {
  console.log(`User connected : ${data.id}`);
});

server.listen(port, () => {
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});
