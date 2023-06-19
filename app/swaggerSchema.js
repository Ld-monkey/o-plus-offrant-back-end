// Objets pour Swagger-----------------------------------------------------------------------------------------

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