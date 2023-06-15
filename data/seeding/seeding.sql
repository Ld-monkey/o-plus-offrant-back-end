-- SQLBook: Code
BEGIN;

TRUNCATE article, utilisateur, categorie, encherir, categorie_article RESTART IDENTITY;

INSERT INTO utilisateur(prenom, nom, adresse_mail, mot_de_passe) VALUES 
('Tony', 'Toto', 'Tony@email.com', '$2b$10$XSgPV66JaFdhsLi0ThtCkOX/u01cnWajZiVAzdkiIKb4r7XScdIi6'),
('Antonio', 'Toti', 'Antonio@email.com', '$2b$10$cvupFjo66gXR.ttGoImp/ecCUgCC0wlUwv7VR4xsQ/.3OZEMuBHvi'),
('Anthony', 'Tito', 'Anthony@email.com', '$2b$10$ilFkuNB9q62mlzlN6KUFtOAYX1hS54Xa9XJTF7fwkVLROQxfoiqEe');

INSERT INTO article(nom, photo, description, prix_de_depart, date_de_fin, montant, date_et_heure, utilisateur_vente_id, utilisateur_achat_id) VALUES
('Chaise', '/images/chaise.jpg', 'La plus belle chaise du monde.', 35.50, NOW()-'1 day'::interval+'7 days'::interval, 40.00, NOW()-'1 day'::interval, 1, 2),
('Rateau', '/images/rateau.jpg', 'description du rateau', 10.00, NOW()-'3 days'::interval+'7 days'::interval, 15.00, NOW()-'3 days'::interval, 1, 3),
('Raquette de tennis', '/images/raquette de tennis.jpg', 'description spéciale Roland Garros', 40.00, NOW()-'2 days'::interval+'7 days'::interval, 44.00, NOW()-'2 days'::interval, 1, 2),
('Monopoly edition spéciale', '/images/Monopoly.jpg', 'c''est une édition spéciale', 250.00, NOW()+'7 days'::interval, 300.00, NOW(), 2, 1),
('Robe', '/images/robe.jpg', 'robe de bal de promo, jamais servie', 800.00, NOW()-'1 day 8 hours'::interval+'7 days'::interval, 900.00, NOW()-'1 day 8 hours'::interval, 3, 1),
('Table', '/images/chaise.jpg', 'La plus belle table du monde.', 10, NOW()-'1 day'::interval+'7 days'::interval, 40.00, NOW()-'1 day'::interval, 1, 2);

INSERT INTO categorie(nom) VALUES
('Meuble'),
('Jardin'),
('Sport'),
('Jeux de société'),
('Mode');

INSERT INTO categorie_article(categorie_id, article_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(1, 6);

INSERT INTO encherir(montant, date, utilisateur_id, article_id) VALUES
(40.00, NOW()-'1 hour'::interval, 2, 1),
(39.00, NOW()-'3 hours'::interval, 3, 1),
(38.00, NOW()-'3 hours'::interval, 2, 1),
(37.00, NOW()-'4 hours'::interval, 3, 1),
(15.00, NOW()-'4 hours'::interval, 3, 2),
(44.00, NOW()-'4 hours'::interval, 2, 3),
(300.00, NOW()-'4 hours'::interval, 1, 4),
(900.00, NOW()-'4 hours'::interval, 1, 5);


COMMIT;