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



//------------------------------------------------
/**
 * return validation middlewares according to
 * a dataSource and a schema
 *
 * @param {Object} schema - a joi validation schema
 * @param {'query'|'body'} dataSource - the source of data to validate
 * @returns {function} - a middleware function
 */
function validate(schema, dataSource) {
  return (request, response, next) => {
    const { error } = schema.validate(request[dataSource]);
    if (error) {
      return response.status(400).json({ status: 'error', errors: error.details.map((err) => err.message) });
    }
    return next();
  };
}

module.exports = validate;




const Joi = require('joi');

const cadexQuery = Joi.object({
  name: Joi.string(),
  adjective: Joi.string(),
  verb: Joi.string(),
  complement: Joi.string(),
});

const cadexBody = Joi.object({
  name: Joi.string(),
  adjective: Joi.string(),
  verb: Joi.string(),
  complement: Joi.string(),
}).required().min(1);

module.exports = { cadexQuery, cadexBody };


//---------------------------------------------------

const jwt = require('jsonwebtoken');

class UserController {
  logout(req, res) {
    const token = req.headers.authorization;

    if (token) {
      try {
        // Vérifier et décoder le JWT pour obtenir les informations de l'utilisateur
        const decoded = jwt.verify(token, 'votre_secret');

        // Effectuer les opérations de déconnexion spécifiques, par exemple :
        // - Révoquer le token dans une liste noire (blacklist)
        // - Supprimer le token des cookies ou du stockage côté client
        // - Enregistrer la déconnexion dans les journaux ou l'historique

        // Retourner une réponse appropriée
        res.status(200).json({ message: 'Déconnexion réussie.' });
      } catch (err) {
        // Gérer les erreurs de décodage du token
        res.status(401).json({ message: 'Token invalide.' });
      }
    } else {
      // Gérer les requêtes sans token
      res.status(401).json({ message: 'Token manquant.' });
    }
  }
}



//---------------------------------------------------

function supprimerProfil(profilId) {
  // Vérification des enchères à la vente
  const enchereVenteEnCours = rechercherEncheresVenteEnCours(profilId);
  if (enchereVenteEnCours.length > 0) {
    console.log("Le profil a des enchères en cours à la vente. Suppression impossible.");
    return;
  }

  // Vérification des enchères à l'achat
  const enchereAchatEnCours = rechercherEncheresAchatEnCours(profilId);
  if (enchereAchatEnCours.length > 0) {
    console.log("Le profil a des enchères en cours à l'achat. Suppression impossible.");
    return;
  }

  // Suppression du profil
  supprimerProfilDeLaBase(profilId);
  console.log("Le profil a été supprimé avec succès.");
}

function rechercherEncheresVenteEnCours(profilId) {
  // Requête pour rechercher les enchères où le profil est le vendeur
  const resultats = encheres.filter((enchere) => enchere.vendeurId === profilId && enchere.etat === 'en_cours');
  return resultats;
}

function rechercherEncheresAchatEnCours(profilId) {
  // Requête pour rechercher les enchères où le profil est l'acheteur
  const resultats = encheres.filter((enchere) => enchere.acheteurId === profilId && enchere.etat === 'en_cours');
  return resultats;
}

function supprimerProfilDeLaBase(profilId) {
  // Supprimer le profil de la base de données
  profils = profils.filter((profil) => profil.id !== profilId);
}

// Exemple d'utilisation
const profilId = 123;
supprimerProfil(profilId);



//------------récupération image----------------

const path = require('path'); // Import du module path


const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.originalname.split('.')[0] + '-' + uniqueSuffix + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

app.post('/api/images', upload.single('imageName'), (req, res) => {
  const imageName = req.file.filename;
  const description = req.body.description;

 // Requête SQL d'insertion des données dans la base de données
 const query = {
  text: 'INSERT INTO "photo" (image_name, description) VALUES ($1, $2)',
  values: [imageName, description],
};

// Exécutez la requête SQL
client.query(query, (err, res) => {
  if (err) {
    console.error(err);
    res.sendStatus(500);
  } else {
    console.log('Image inserted into database');
    res.send({ description: description, imageName: imageName });
  }
});
  console.log(description, imageName);

  const imagePath = path.join(__dirname, 'public/images', imageName);
  res.type('image/png'); // Remplacez 'image/png' par le type d'image approprié

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
});