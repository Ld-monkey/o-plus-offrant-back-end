require('dotenv').config();

const express = require('express');
const router = require('./app/routers');
const session = require('express-session');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

// Charger les données de la sessions sur `req.session` et `res.locals`
app.use(
  session({
      saveUninitialized: true,
      resave: true,
      secret: 'lesupersecretoplusoffrant654654Csdfsdf',
  })
);

app.use(router);

app.listen(port, ()=>{
  console.log(`Serveur lancé sur : http://localhost:${port}`);
});

