   getOneFigurine: async id => {
    const sql = {
        text: "SELECT * FROM figurine WHERE id=$1",
        values: [id]
    }
    const result = await client.query(sql);
    return result.rows[0];
}

//---------------------------------------------------------

createList: async (req, res) => {
  try {
    /*const name = req.body.name;
      const position = req.body.position;*/
    const { name, position } = req.body;        // On récupère les valeurs dans le body (en déstructuration)
    const bodyErrors = [];                      // On créé une array dans laquelle on glissera les erreurs éventuelles
    if (!name) {                                // Si le name est absent de la requete
      bodyErrors.push('name can not be empty'); // On glisse l'erreur dans l'array bodyErrors
    }
                                                // Si il y avait d'autres valeurs à tester, on pourrait glisser les erreurs dans bodyErrors
                                                // Cela permet de lister les différentes erreurs et de renvoyer le tout vers le frontend

    if (bodyErrors.length) {                    // Si une (ou plusieurs) erreur est détectée
      res.status(422).json(bodyErrors);         // On envoie la liste d'erreurs avec le code 400 : Requête incorrecte
    } else {                                    // Sinon, s'il n'y a pas d'erreurs
      let newList = List.build({                // On créé une instance de la liste avec .build() (cf : https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance)
        name,
        position,
        //equipement
      });
      // ... Par exemple, on veut donner un suffixe au nom de la liste
      // newList = newList + "-MonSuperSuffixe";
      // newList.password = leRésultatDeBcrypt
      await newList.save();                     // On enregistre l'instance créée dans la db
      res.status(201).json(newList);            // On répond avec la liste créée  
    }

  } catch (error) {
    console.trace(error);
    res.status(500).json(error.toString());
  }
},


// ---------------------------------------------------------------

modifyList: async (req, res) => {
  try {
    const listId = req.params.id;                       // On récupère l'id de la liste à modifier
    const list = await List.findByPk(listId);           // On cherche la liste dans la db
    if (!list) {                                        // Si la liste n'existe pas
      res.status(404).send('Cant find list ' + listId); // On retourne une erreur 404
    } else {                                            // Sinon, si la liste existe

      const { name, position } = req.body;              // On récupère les nouvelles infos dans le body
                                                        // On ne change que les paramètres présents
      if (name) {                                       // Si name est présent dans le body
        list.name = name;                               // On change le name de l'objet instancié "list" (récupéré à la ligne 77)
      }

      if (position) {                                   // Si position est présent dans le body
        list.position = position;                       // On change la position de l'objet instancié "list" 
      } 

      await list.save();                                // Une fois toutes les modifs faites, on enregistre l'instance dans la db

      res.status(200).json(list);                       // Une fois que l'instance est enregistrée, on envoie la list en réponse à la requête
    }

  } catch (error) {
    console.trace(error);
    res.status(500).json(error.toString());
  }
},


// ---------------------------------------------------


deleteList: async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await List.findByPk(listId);
    if(list){
      await list.destroy();
      res.status(200).json('OK');
    }
    
  } catch (error) {
    console.trace(error);
    res.status(500).json(error.toString());
  }
}




//------------------------------------------------------------

// Controller
const controller = {
    AddProduct: async (req, res) => {
      try {
        // Récupérer les données du corps de la requête
        const { name, price, description } = req.body;
        
        // Valider les données (vous pouvez ajouter vos propres validations ici)
        if (!name || !price || !description) {
          return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }
  
        // Appeler le datamapper pour enregistrer le produit
        const product = await dataMapper.addProduct({ name, price, description });
  
        // Répondre avec le produit créé
        res.status(201).json({ product });
      } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de l\'ajout du produit:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout du produit.' });
      }
    }
  };
  
  // DataMapper
  const dataMapper = {
    addProduct: async (productData) => {
      // Effectuer les opérations nécessaires pour enregistrer le produit dans la base de données
      // Par exemple, vous pouvez utiliser une bibliothèque comme Mongoose pour interagir avec MongoDB
      
      // Code factice pour illustrer le fonctionnement
      const newProduct = {
        id: 123,
        ...productData
      };
      
      // Retourner le produit créé
      return newProduct;
    }
  };




  async function AddOneProduct(nom, photo, description, prixDeDepart, dateDeFin, dateEtHeure, utilisateurVenteId) {
    try {
      // Effectuer la requête dans la base de données pour ajouter le produit
      const preparedQuery = `
        INSERT INTO article(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [nom, photo, description, prixDeDepart, dateDeFin, dateEtHeure, utilisateurVenteId];
      const result = await client.query(preparedQuery, values);
  
      // Renvoyer les résultats
      return result.rows;
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors de l\'ajout du produit:', error);
      throw new Error('Une erreur est survenue lors de l\'ajout du produit.');
    }
  }





  async insert(tableName, object) {
    debug(`insert into ${tableName}`, object);

    const columns = Object.keys(object).join(', ');
    const values = Object.values(object);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const preparedQuery = {
      text: `INSERT INTO "${tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`,
      values,
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },


  async registerUser(user) {
    debug('registerUser', user);
    const preparedQuery = {
      text: 'INSERT INTO "user" ("email","password") VALUES ($1,$2) RETURNING *',
      values: [user.email, user.password],
    };
    const registredUser = await client.query(preparedQuery);
    return registredUser.rows[0];
  },


/*   const userController = {
    async register(request, response, next) {
      debug('register', request.body);
      const { email, password } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (!email || !password) {
        next(new Error400());
      }
  
      await dataMapper.registerUser({
        email,
        password: hashedPassword,
      });
  
      response.json({ status: 'success' });
    }, */



    const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
// Importez vos propres fonctions pour interagir avec la base de données
// Par exemple, si vous utilisez MySQL, vous pouvez utiliser le module mysql2
const { createUser, getUserByEmail } = require('../database');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            const { firstname, lastname, email, password, passwordConfirm } = req.body;

            if (!emailValidator.validate(email)) {
                res.render('register', {
                    error: 'Email invalide',
                });
                return;
            }

            if (password !== passwordConfirm) {
                res.render('register', {
                    error: 'Le mot de passe ne correspond pas',
                });
                return;
            }

            const checkUser = await getUserByEmail(email);
            if (checkUser) {
                res.render('register', {
                    error: 'Email déjà utilisé',
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await createUser({
                name: firstname + ' ' + lastname,
                email: email,
                password: hashedPassword,
            });

            res.render('login', {
                message: 'Vous pouvez maintenant vous connecter !',
            });
        } catch (error) {
            console.log(error);
            res.render('register', { error: error.message });
        }
    },

    show: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = userController;


