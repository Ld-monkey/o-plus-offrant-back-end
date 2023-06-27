const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage, fileFilter} = require('../helpers/imageHandler');
const upload = multer({storage, fileFilter, limits:{fileSize: 10*1024*1024}});


// Controllers-------------------------------------------------------------------------------------------------
const auctionController = require('../controllers/auctionController.js');
const categoryController = require('../controllers/categoryController.js');
const articleController = require('../controllers/articleController.js');
const userController = require('../controllers/userController.js');

// Middleware d'authorisation et validation--------------------------------------------------------------------
const auth = require('../models/middlewares/auth.js');
const { registerUser, loginUser, addArticle, updateArticle, auction, updateProfile, updateProfilePwd } = require('../validations/schemas.js');
const validate = require('../validations/validate.js');


// routes des articles-----------------------------------------------------------------------------------------
router.get('/api/articles', articleController.AllArticlesPage);                                                               // affiche tous les articles en cours d'enchère
router.get('/api/article/:id', articleController.OneArticlePage);                                                             // affiche les détails d'un article
router.post('/article/creation/add', upload.single('photo'), validate(addArticle, 'body'), articleController.AddArticle);     // ajoute un article dans la BDD
router.patch('/article/:id/update', validate(updateArticle, 'body'), articleController.UpdateArticle);                        // modifie un article
router.delete('/article/:id/delete', articleController.DeleteArticle);                                                        // supprime un article grâce grâce son id
router.get('/api/category/:id/articles', articleController.ArticlesOfOneCategory);                                            // affiche tous les articles d'une catégorie 


// routes des categories-----------------------------------------------------------------------------------------
router.get('/api/categories', categoryController.AllCategoriesPage);                                                          // affiche toutes les catégories
router.post('/category/creation/add', categoryController.AddCategory);                                                        // ajoute une catégorie


// Login et autorisations----------------------------------------------------------------------------------------
router.post('/api/register', validate(registerUser, 'body'),userController.AddUser);                                          // ajoute un utilisateur avec mot de passe crypté à la BDD
router.post('/api/login', validate(loginUser, 'body'), userController.Login);                                                 // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/api/refresh-token', userController.RefreshToken);                                                               // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken
router.get('/api/profile/:id', userController.OneProfilePage);                                                                // affiche des informations pour la page profil d'un utilisateur
router.patch('/api/profile/:id/update', validate(updateProfile, 'body'), userController.UpdateProfile);                       // modifie les informations de la page profil d'un utilisateur
router.put('/api/profile/:id/pwdupdate', validate(updateProfilePwd, 'body'), userController.UpdateProfilePwd);                // modifie le mot de passe de la page profil d'un utilisateur
router.delete('/api/profile/:id/delete', userController.DeleteProfile);                                                       // supprime le profil d'un utilisateur


// Route du bouton enchérir---------------------------------------------------------------------------------------
router.post('/api/auction', validate(auction, 'body'), auctionController.Auctioning);                                        // ajoute le montant en cliquant sur le bouton enchérir

// Route test-----------------------------------------------------------------------------------------------------
router.get('/api/users', auth, userController.AllUsers);                                                                      // route TEST : affiche tous les utilisateurs SI porteur d'un accessToken valide


module.exports = router;
