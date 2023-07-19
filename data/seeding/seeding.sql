-- SQLBook: Code
BEGIN;

TRUNCATE article, utilisateur, categorie, encherir, categorie_article RESTART IDENTITY;

INSERT INTO utilisateur(prenom, nom, adresse, adresse_mail, mot_de_passe) VALUES 
('Tony', 'Toto', '10 rue des Champs', 'Tony@email.com', '$2b$10$XSgPV66JaFdhsLi0ThtCkOX/u01cnWajZiVAzdkiIKb4r7XScdIi6'),
('Antonio', 'Toti', '11 rue des Champs', 'Antonio@email.com', '$2b$10$cvupFjo66gXR.ttGoImp/ecCUgCC0wlUwv7VR4xsQ/.3OZEMuBHvi'),
('Anthony', 'Tito', '12 rue des Champs', 'Anthony@email.com', '$2b$10$ilFkuNB9q62mlzlN6KUFtOAYX1hS54Xa9XJTF7fwkVLROQxfoiqEe'),
('Stéphane', 'Bidard', '13 rue des Champs', 'Stephane@email.com', '$2b$10$BhlwaJpfE0kEpfis.TYPFub6JSDrOGqA.Lre1wlF.V5/AEUBfVZqO'),
('Ludovic', 'Fourteau', '14 rue des Champs', 'Ludovic@email.com', '$2b$10$xzGbptvHRVi.23QczdjFVOsr84c.s/.4x/YpECRxJAvTY5f38iAry'),
('Didier', 'Lambert', '15 rue des Champs', 'Didier@email.com', '$2b$10$ihRHw9lUcuejDcrwJV5zCOXOKpj44smoe8LRwjQsepGl0476N4vR6'),
('Estelle', 'Li-Zheng', '16 rue des Champs', 'Estelle@email.com', '$2b$10$bhdpyQvryzTTlX7ZKFyQcezK1qI9yr9c3Em7fs3L4oDaOP1wn59ye'),
('Christophe', 'Miranville', '17 rue des Champs', 'Christophe@email.com', '$2b$10$0H.hUDGDfxmXyY9g6K6iNeTedKfmZbNQDF5EOW82386ivaO1IMVRC');


INSERT INTO article(nom, photo, description, prix_de_depart, date_de_fin, montant, date_et_heure, utilisateur_vente_id, utilisateur_achat_id) VALUES
('Chaise', '/images/chaise.jpg', 'La plus belle chaise du monde', 35.00, '2023-08-21'::date +'15 hours 30 minutes'::interval +'7 days'::interval, 40.00, '2023-08-21'::date +'15 hours 30 minutes'::interval, 1, 2),
('Rateau', '/images/rateau.jpg', 'Description du rateau', 10.00, '2023-08-20'::date +'12 hours 30 minutes'::interval +'7 days'::interval, 15.00, '2023-08-20'::date +'12 hours 30 minutes'::interval, 1, 3),
('Raquette de tennis', '/images/raquette de tennis.jpg', 'Spéciale Roland Garros', 40.00, '2023-08-20'::date +'10 hours'::interval +'7 days'::interval, 40.00, '2023-08-20'::date +'10 hours'::interval, 1, 2),
('Monopoly edition spéciale', '/images/monopoly.jpg', 'C''est une édition spéciale', 250.00, '2023-08-20'::date +'8 hours 40 minutes'::interval +'7 days'::interval, 250.00, '2023-08-20'::date +'8 hours 40 minutes'::interval, 2, 1),
('Robe', '/images/robe.jpg', 'Robe de bal de promo, jamais servie', 800.00, '2023-08-19'::date +'10 hours'::interval +'7 days'::interval, 900.00, '2023-08-19'::date +'10 hours'::interval, 3, 1),
('Table', '/images/table.jpeg', 'La plus belle table du monde', 10.00, '2023-08-15'::date +'10 hours'::interval +'7 days'::interval, 10.00, '2023-08-15'::date +'10 hours'::interval, 1, 2),
('Canapé', '/images/canapé.jpeg', 'Vla le canapé', 3500.00, '2023-08-13'::date +'20 hours 50 minutes'::interval +'7 days'::interval, 3500.00, '2023-08-13'::date +'20 hours 50 minutes'::interval, 2, 3),
('Arrosoir', '/images/arrosoir.jpeg', 'Description de l''arrosoir', 100.00, '2023-08-10'::date +'8 hours 20 minutes'::interval +'7 days'::interval, 100.00, '2023-08-10'::date +'8 hours 20 minutes'::interval, 2, 1),
('Ballon', '/images/ballon.jpeg', 'Ballon officiel France 98', 75.00, '2023-08-14'::date +'17 hours 5 minutes'::interval +'7 days'::interval, 75.0, '2023-08-14'::date +'17 hours 5 minutes'::interval, 1, 2),
('Les petits cheveaux', '/images/petitscheveaux.jpeg', 'Edition spéciale PETA', 200.00, '2023-08-19'::date +'12 hours 12 minutes'::interval +'7 days'::interval, 200.00, '2023-08-19'::date +'12 hours 12 minutes'::interval, 1, 2),
('Jean', '/images/jean.jpeg', 'Taille 38', 1200.00, '2023-08-18'::date +'11 hours 45 minutes'::interval +'7 days'::interval, 1300.00, '2023-08-18'::date +'11 hours 45 minutes'::interval, 3, 1),
('Parasol', '/images/parasol.jpeg', 'Ombrage et style authentique', 100, '2023-08-21'::date +'9 hours'::interval +'7 days'::interval, 400.00, '2023-08-21'::date +'9 hours'::interval, 2, 3),
('Lit (expiré test)', '/images/lit.jpeg', 'Lit douillet', 800.00, '2023-08-01'::date + '12 hours'::interval, 1050.00, '2023-05-20'::date + '12 hours'::interval, 7, 1);




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
(1, 6),
(1, 7),
(2, 8),
(3, 9),
(4, 10),
(5, 11),
(2, 12),
(1, 13);

INSERT INTO encherir(montant, date, utilisateur_id, article_id) VALUES
(40.00, '2023-08-22'::date + '9 hours'::interval, 2, 1),
(39.00, '2023-08-22'::date + '8 hours'::interval, 3, 1),
(38.00, '2023-08-21'::date + '17 hours'::interval, 2, 1),
(37.00, '2023-08-21'::date + '16 hours'::interval, 3, 1),

(15.00, '2023-08-21'::date + '15 hours'::interval, 3, 2),
(12.00, '2023-08-21'::date + '9 hours'::interval, 2, 2),
(11.00, '2023-08-20'::date + '13 hours'::interval, 3, 2),

(900.00, '2023-08-20'::date + '9 hours'::interval, 1, 5),
(875.00, '2023-08-19'::date + '17 hours'::interval, 6, 5),
(850.00, '2023-08-19'::date + '11 hours'::interval, 1, 5),

(1300.00, '2023-08-21'::date + '8 hours'::interval, 1, 11),
(1275.00, '2023-08-19'::date + '9 hours'::interval, 4, 11),
(1250.00, '2023-08-18'::date + '19 hours'::interval, 6, 11),

(400.00, '2023-08-22'::date + '18 hours'::interval, 3, 12),
(350.00, '2023-08-22'::date + '19 hours'::interval, 2, 12),
(300.00, '2023-08-22'::date + '7 hours'::interval, 6, 12),
(250.00, '2023-08-21'::date + '15 hours'::interval, 5, 12),
(150.00, '2023-08-21'::date + '10 hours'::interval, 3, 12),

(1050.00, '2023-08-01'::date + '11 hours'::interval, 1, 13),
(900.00, '2023-05-28'::date + '8 hours'::interval, 6, 13),
(850.00, '2023-05-20'::date + '17 hours'::interval, 5, 13);



COMMIT;
