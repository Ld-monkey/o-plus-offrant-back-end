const Joi = require('joi');


const registerUser = Joi.object({
  prenom: Joi.string().required(),
  nom: Joi.string().required(),
  adresse_mail: Joi.string().email().required(),
  mot_de_passe: Joi.string().required().min(4),
});


const loginUser = Joi.object({
  adresse_mail: Joi.string().email().required(),
  mot_de_passe: Joi.string().required().min(4),
});


const addArticle = Joi.object({
  nom: Joi.string().required(),
  photo: Joi.string().required(),
  description: Joi.string().max(3000),
  prix_de_depart: Joi.number().integer().positive().min(1).required(),
  date_de_fin: Joi.date().greater(Joi.ref('date_et_heure')).required(),
  date_et_heure: Joi.date().required(),
  utilisateur_vente_id: Joi.number().integer().required(),
  categorie_id: Joi.number().integer().required(),
});


const auction = Joi.object({
prix: Joi.number().integer().positive().required(),
articleId: Joi.number().integer().required(),
acheteurId: Joi.number().integer().required(),
})



module.exports = { registerUser, loginUser, addArticle, auction  };