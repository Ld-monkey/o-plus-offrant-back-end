const bcrypt = require('bcrypt');
const client = require('../models/client.js');
const jwt = require('jsonwebtoken');
const JwtTokens = require('../helpers/jwt.js');
const dataMapper = require("../models/datamapper");

const userController = {
  // voir tous les utilisateurs dans la BDD
  AllUsers: async (__, res) => {
    try {
      const users = await client.query('SELECT * FROM "utilisateur"');
      res.json({users : users.rows});
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  },

  // enregistrer un utilisateur dans la BDD avec son mot de passe crypté
  AddUser: async (req, res) => {
    try {
      const hashedPwd = await bcrypt.hash(req.body.mot_de_passe,10);
      const newUser = await client.query
      (`INSERT INTO utilisateur(prenom, nom, adresse_mail, mot_de_passe) VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.body.prenom, req.body.nom, req.body.adresse_mail, hashedPwd] );
      res.json({users : newUser.rows[0]});
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  },

  // s'identifier avec son mail + mdp : donne un accessToken et un refreshToken
  Login: async (req, res) => {
    try {
      const {adresse_mail,mot_de_passe} = req.body;
      const users = await client.query('SELECT * FROM "utilisateur" WHERE adresse_mail = $1', [adresse_mail] );
      if(users.rows.length === 0) return res.status(401).json({error: "Email est incorrecte"});
      // password check
      const validPwd = await bcrypt.compare(mot_de_passe,users.rows[0].mot_de_passe);
      if(!validPwd) return res.status(401).json({error:"Incorrect password"});
      // si password ok, on envoie les tokens JWT
      let tokens = JwtTokens(users.rows[0]);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({error:error.message});
    }
  },


  // Vérifie si le refreshtoken transporté est valide
  // (ne pas oublier de mettre un refreshtoken dans le Bearer lors des tests)
  RefreshToken: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const refreshToken = authHeader.split('Bearer ')[1];
      if(refreshToken === null) return res.status(401).json({error: "Null refresh token"});
      jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(error, user) => {
        if(error) return res.status(403).json({error:error.message});
        let tokens = JwtTokens(user);
        res.json(tokens);
      })
    } catch (error) {
      res.status(500).json({error:error.message});
    }
  },


  async OneProfilePage(req, res) {
    const id = Number(req.params.id);
    try {
      const profile = await dataMapper.getOneProfile(id);
        res.send(profile);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },


  async UpdateProfile(req, res) {
    const id = Number(req.params.id);
    try {
      const { nom, prenom, adresse, adresse_mail } = req.body;
      const profile = await dataMapper.UpdateOneProfile(id, nom, prenom, adresse, adresse_mail);
      res.json({ status : 'profile update successful', data : profile }); //!! TODO modifier la condition d'erreur quand l'ID n'existe pas
    }
  catch(error){
    console.trace(error);
    res.status(500).send('Error 500');
  }
},


async DeleteProfile(req, res) {
  const id = Number(req.params.id);
  try {
      const deleteProfile = await dataMapper.DeleteOneProfile(id);
      res.status(200).json(`Le profile avec l'ID n°${id} a bien été supprimé`);
    }
  catch(error){
    console.trace(error);
    res.status(500).send('Error 500');
  }
}

};

module.exports = userController;