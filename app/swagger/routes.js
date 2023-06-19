// Routes Swagger ---------------------------------------------


/**
 * GET /api/articles
 * @summary affiche tous les articles
 * @tags Article
 * @return {object} 200 - success response - application/json
 */



/**
 * GET /api/article/{id}
 * @summary affiche un article
 * @tags Article
 * @param {number} id.path.required - article id
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /article/creation/add
 * @summary affiche un article
 * @tags Article
 * @param {addArticle} request.body.required - objet de l'article à créer
 * @return {object} 200 - success response - application/json
 */


/**
 * PATCH /article/{id}/update
 * @summary affiche un article
 * @tags Article
 * @param {number} id.path.required - id de l'article a mettre à jour
 * @param {updateArticle} request.body.required - modifications à apporter
 * @return {object} 200 - success response - application/json
 */



/**
 * DELETE /article/{id}/delete
 * @summary supprime un article grâce grâce son id
 * @tags Article
 * @param {number} id.path.required - id de l'article à supprimer
 * @return {object} 200 - success response - application/json
 */


/**
 * GET /api/category/{id}/articles
 * @summary affiche tous les articles d'une catégorie
 * @tags Article
 * @param {number} id.path.required - id de la catégorie des articles qu'on souhaite consulter
 * @return {object} 200 - success response - application/json
 */



/**
 * GET /api/categories
 * @summary affiche toutes les catégories
 * @tags Catégorie
 * @return {object} 200 - success response - application/json
 */




/**
 * POST /category/creation/add
 * @summary ajoute une catégorie depuis un JSON
 * @tags Catégorie
 * @param {addCategory} request.body.required - objet de la catégorie à créer
 * @return {object} 200 - success response - application/json
 */



// Login et autorisations-----------------------------------------------------------------------------------------



/**
 * POST /api/register
 * @summary ajoute un utilisateur avec mot de passe crypté à la BDD
 * @tags Utilisateur
 * @param {addUser} request.body.required - objet pour l'utilisateur à créer
 * @return {object} 200 - success response - application/json
 */

/**
 * POST /api/login
 * @summary ajoute un utilisateur avec mot de passe crypté à la BDD
 * @tags Utilisateur
 * @param {logUser} request.body.required - objet pour l'utilisateur à créer
 * @return {object} 200 - success response - application/json
 */
router.post('/api/login', validate(loginUser, 'body'), jwtController.Login);                 // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/api/refresh-token', jwtController.RefreshToken);                               // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken //! TODO fonction à vérifier

//router.get('/api/logout', jwtController.Logout);                                             // déconnecte l'utilisateur coté client ? //! a voir avec le front


// Route du bouton enchérir---------------------------------------------------------------------------------------
router.post('/api/auction', validate(auction, 'body'), controller.Auctioning);               // Ajoute le montant en cliquant sur le bouton enchérir


