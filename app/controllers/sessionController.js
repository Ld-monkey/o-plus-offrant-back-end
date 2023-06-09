const bcrypt = require('bcrypt');
const { User } = require('../models/user.json');

const sessionController = {
    index: (req, res) => {
      console.log("Go te login");
      //res.render('login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email: email,
                },
                include: 'role',
            });
            
            if (!user) {
                res.render('login', {
                    error: "Utilisateur ou mot de passe incorrect"
                });
                return;
            }

            const isGood = await bcrypt.compare(password, user.password);

            if (!isGood) {
                res.render('login', {
                    error: "Utilisateur ou mot de passe incorrect"
                });
                return;
            }

            console.log(user);
            // ici on a choisi de ne pas mettre le mot de passe hashé dans la session et on simplifie l'objet pour garder uniquement quelques infos utiles
            const formattedUser = {
                id: user.id,
                name: user.name,
                role: {
                    name: user.role.name,
                },
            };
            req.session.user = formattedUser;

            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    logout: (req, res) => {
        delete req.session.user;
        res.redirect('/');
    },
};

module.exports = sessionController;