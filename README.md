<div align="center">
    <h1>O + Offrant (Back-end)</h1>
    <p>Site d'enchère</p>
</div>

## **Description**

Le projet 6 nommé **O + Offrant** est un site d'enchère destiné aux particuliers majeurs.<br>
Il permet de déposer un article de son choix et ou d'enchérir avec des tokens afin de remporter un lot.

---

## 📦 **Installation**

### **Création de l'utilisateur et de la base de données**

Créer une base de donnée et un utilisateur associé.<br>
Pour cela, il faut lancer un terminal :

``` bash
sudo -i -u postgres psql
```

Invite de commande postgres=#.

``` bash
# Créer un utilisateur
CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
```

``` bash
# Créer la base de données avec l'utilisateur associé
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
```

---

### **Dépendances**

Pour installer les dépendances du projet :

```bash
npm i
```

---

### **Configuration de l'API back-end**

Configurer les variables d'environnement

```bash
# Copier l'exemple de l'environnement
cp .env.example .env

# Configurer l'url
nano .env
```
Dans le fichier **.env** remplir les variables

Configurer sqitch

```bash
# Copier l'exemple de l'environnement sqitch
cp sqitch.conf.example sqitch.conf

# Configurer sqitch
nano sqitch.conf
```
Dans le fichier **sqitch.conf** remplir les variables



---

## 🪄 **Usage**

Vérifier les paramétrages des scripts dans **package.json** en fonction du nom de votre **base de données** et **d'utilisateur**.

Exemple avec **db:create** :

```bash
"db:create": "psql -U PGUSER -d PGDATABASE -f ./data/deploy/init.sql",
```
---


Pour lancer la création de la base de données :

```bash
npm run db:create
```
---


Pour lancer le seeding de la base de données :

```bash
npm run db:populate
```
---


Si besoin, il existe un script pour réinitiliser la base et les données :

```bash
npm run reset
```
---


Pour lancer le site en localhost :

```bash
npm run dev
```
---


Pour lancer le site en production :

```bash
npm run start
```
---


## ✨ **Contributeurs**

   * Coté Front-end
      + [Ludovic FOURTEAU](https://github.com/Ld-monkey)
      + [Estelle LI-ZHENG](https://github.com/Estelle-Li-Zheng)
      + [Christophe MIRANVILLE](https://github.com/Christophe-miranville)

   * Coté Back-end
      + [Stéphane BIDARD](https://github.com/stephanebidard)
      + [Didier LAMBERT](https://github.com/DidierLam)
