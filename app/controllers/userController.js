const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User } = require('../models/user.json');

const userController = {
    index: (req, res) => {
        res.render('register');
    },

    register: async (req, res) => {
        try {
            const  { firstname, lastname, email, password, passwordConfirm } = req.body;

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

            const checkUser = await User.findOne({   
                where: {
                    email: email,
                }, 
            });
            if (checkUser) {
                res.render('register', {
                    error: 'Email déjà utilisé',
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
               name: firstname + ' ' + lastname,
               email: email,
               password: hashedPassword, 
            });
            const customerRole = await Role.findByPk(1);
            user.setRole(customerRole);

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