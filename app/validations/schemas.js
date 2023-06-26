const Joi = require('joi');


const registerUser = Joi.object({
  prenom: Joi.string().required(),
  nom: Joi.string().required(),
  adresse : Joi.string().required(),
  adresse_mail: Joi.string().email().required(),
  mot_de_passe: Joi.string().required().min(4),
});


const loginUser = Joi.object({
  adresse_mail: Joi.string().email().required(),
  mot_de_passe: Joi.string().required().min(4),
});


const addArticle = Joi.object({
  nom: Joi.string().required().max(23),
  photo: Joi.string(),
  description: Joi.string().max(3000),
  prix_de_depart: Joi.number().integer().positive().min(1).required(),
  date_de_fin: Joi.date().greater(Joi.ref('date_et_heure')).required(),
  date_et_heure: Joi.date().required(),
  utilisateur_vente_id: Joi.number().integer().positive().min(1).required(),
  categorie_id: Joi.number().integer().positive().min(1).required(),
  montant: Joi.number().equal(Joi.ref('prix_de_depart')).integer().positive().min(1).required(),
});

const updateArticle = Joi.object({
  nom: Joi.string().required().max(23),
  description: Joi.string().max(3000),
  utilisateur_vente_id: Joi.number().integer().positive().min(1).required(),
});


const auction = Joi.object({
  prix: Joi.number().integer().positive().required(),
  articleId: Joi.number().integer().positive().min(1).required(),
  acheteurId: Joi.number().integer().positive().min(1).required(),
});

const updateProfile = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  adresse: Joi.string(),
  adresse_mail: Joi.string().email().required(),
})



module.exports = { registerUser, loginUser, addArticle, updateArticle, auction, updateProfile };