const express = require('express');
const app = express();
const Joi = require('joi');

// Middleware pour traiter les données de la requête
app.use(express.json());

// Schéma de validation avec Joi
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(99)
});

// Route pour créer un utilisateur
app.post('/api/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    // Les données de la requête sont valides, les utiliser pour créer un utilisateur
    // ...

    res.json({ message: 'Utilisateur créé avec succès', user: value });
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000');
});



//-------------------BUNYAN---------------------
const bunyan = require('bunyan');

// Créer un logger Bunyan
const logger = bunyan.createLogger({ name: 'myapp' });

// Exemple de journalisation
logger.info('Ceci est un message d\'information');
logger.warn({ errorCode: 'ABC123' }, 'Avertissement: une erreur s\'est produite');

// Utilisation d'un contexte spécifique
const requestContextLogger = logger.child({ requestId: '12345' });
requestContextLogger.info('Message de journalisation avec un contexte spécifique');