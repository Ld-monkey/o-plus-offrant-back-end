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
 * GET /api/category/{id}/articles
 * @summary affiche tous les articles d'une catégorie
 * @tags Article
 * @param {number} id.path.required - id de la catégorie des articles qu'on souhaite consulter
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /article/creation/add
 * @summary ajoute un article
 * @tags Article
 * @param {addArticle} request.body.required - objet de l'article à créer
 * @return {object} 200 - success response - application/json
 */


/**
 * PATCH /article/{id}/update
 * @summary modifier un article
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
 * GET /api/categories
 * @summary affiche toutes les catégories
 * @tags Catégorie
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /category/creation/add
 * @summary ajoute une catégorie
 * @tags Catégorie
 * @param {addCategory} request.body.required - objet de la catégorie à créer
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /api/register
 * @summary ajoute un utilisateur avec mot de passe crypté à la BDD
 * @tags Utilisateur
 * @param {addUser} request.body.required - objet pour ajouter un utilisateur
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /api/login
 * @summary identifie un utilisateur
 * @tags Utilisateur
 * @param {logUser} request.body.required - objet pour identifier l'utilisateur
 * @return {object} 200 - success response - application/json
 */

/**
 * POST /api/refresh-token
 * @summary rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken
 * @tags Utilisateur
 * @param {refreshToken} request.body.required - voir commentaire en back //!! A REVOIR pour le refresh token dans le api-doc
 * @return {object} 200 - success response - application/json
 */


/**
 * POST /api/auction
 * @summary Ajouter une enchère
 * @tags Enchère
 * @param {addAuction} request.body.required - objet pour enchérir
 * @return {object} 200 - success response - application/json
 */


/**
 * GET /api/profile/{id}
 * @summary affiche des informations pour la page profil d'un utilisateur
 * @tags Profile
 * @param {number} id.path.required - id de l'utilisateur qu'on souhaite consulter
 * @return {object} 200 - success response - application/json
 */


/**
 * PATCH /api/profile/{id}/update
 * @summary modifie les informations de la page profil d'un utilisateur
 * @tags Profile
 * @param {number} id.path.required - id de l'utilisateur qu'on souhaite mettre à jour
 * @param {updateProfile} request.body.required - objet pour enchérir
 * @return {object} 200 - success response - application/json
 */


/**
 * DELETE /api/profile/{id}/delete
 * @summary supprime le profil d'un utilisateur
 * @tags Profile
 * @param {number} id.path.required - id de l'utilisateur qu'on souhaite supprimer
 * @return {object} 200 - success response - application/json
 */

