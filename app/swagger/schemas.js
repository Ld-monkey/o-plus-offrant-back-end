/**
 * @typedef {object} article
 * @property {integer} id - id de l'article
 * @property {string} nom - nom de l'article
 * @property {string} photo - photo de l'article stockée dans le serveur
 * @property {string} description - description de l'article
 * @property {number} prix_de_depart - prix demandé au départ - float
 * @property {string} date_de_fin - date de fin de l'enchère - date
 * @property {number} montant - dernier montant enchéri - float
 * @property {string} date_et_heure - date de la dernière enchère - date
 * @property {integer} utilisateur_vente_id - id de l'utilisateur vendeur
 * @property {integer} utilisateur_achat_id - id de l'utilisateur acheteur
 * 
 */

/**
 * @typedef {object} category
 * @property {integer} id - id de la catégorie
 * @property {string} nom - nom de la catégorie
 * 
 */

/**
 * @typedef {object} category_article
 * @property {integer} category_id - id de la catégorie
 * @property {integer} article_id - id de l'article
 * 
 */

/**
 * @typedef {object} auction
 * @property {integer} id - id de l'enchère
 * @property {number} montant - dernier montant enchéri - float
 * @property {string} date - date de fin de l'enchère - date
 * @property {integer} utilisateur_id - id de l'utilisateur acheteur
 * @property {integer} article_id - id de l'article acheté
 * 
 */

/**
 * @typedef {object} addArticle
 * @property {string} nom - nom de l'article
 * @property {string} photo - photo de l'article stockée dans le serveur
 * @property {string} description - description de l'article
 * @property {number} prix_de_depart - prix demandé au départ - float
 * @property {string} date_de_fin - date de fin de l'enchère - date
 * @property {string} date_et_heure - date de la dernière enchère - date
 * @property {integer} utilisateur_vente_id - id de l'utilisateur vendeur
 * @property {integer} categorie_id - id de la catégorie de l'article
 * 
 */


/**
 * @typedef {object} updateArticle
 * @property {string} nom - nom de l'article
 * @property {string} photo - photo de l'article stockée dans le serveur
 * @property {string} description - description de l'article
 * @property {integer} utilisateur_vente_id - id de l'utilisateur vendeur
 * 
 */


/**
 * @typedef {object} addCategory
 * @property {string} nom - nom de catégorie
 * 
 */


/**
 * @typedef {object} addUser
 * @property {string} prenom - prénom de l'utilisateur
 * @property {string} nom - nom de l'utilisateur
 * @property {string} adresse_mail - email de l'utilisateur
 * @property {string} mot_de_passe - mot de passe de l'utilisateur
 * 
 */


/**
 * @typedef {object} logUser
 * @property {string} adresse_mail - email de l'utilisateur
 * @property {string} mot_de_passe - mot de passe de l'utilisateur
 * 
 */


/**
 * @typedef {object} refreshToken
 * @property {string} refreshToken - le refresh
 * 
 */


/**
 * @typedef {object} addAuction
 * @property {number} prix - montant de l'enchère
 * @property {integer} articleId - id de l'article sur lequel on enchérit
 * @property {integer} acheteurId - id de l'acheteur qui enchérit
 * 
 */


/**
 * @typedef {object} updateProfile
 * @property {string} nom - nom de l'utilisateur
 * @property {string} prenom - prénom de l'utilisateur
 * @property {string} adresse - adresse de l'utilisateur
 * @property {integer} adresse_mail - email de l'utilisateur
 * 
 */
