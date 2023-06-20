<!--
  Titre du projet. DONE
  Description du projet. DONE
  Comment installer et exécuter le projet.
        créer une BDD DONE
        créer l'utilisateur de la BDD DONE
        premières tables ?
        récupérer les modules (npm install) DONE
        lancer des scripts ???
        node index.js

  Comment utiliser le projet.
        config .env et .sqitch?
        node index.js

  Inclure des crédits. DONE
  Ajouter une licence.
  Badges.
 -->



<div align="center">
    <img src="./public/Logo.webp" width="200" />
    <h1>O + Offrant (Back-end)</h1>
    <p>Site d'enchère</p>
</div>

## :books: **Description**

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
# Copier l'exemple de l'environnement
cp sqitch.conf.example sqitch.conf

# Configurer sqitch
nano sqitch.conf
```
Dans le fichier **sqitch.conf** remplir les variables



---

## 🪄 **Usage**

Pour lancer le site en [localhost](http://localhost:5173/) :

```bash
yarn dev
```
---

## ✨ **Contributeurs**

   * Coté Front-end
      + [Christophe-miranville](https://github.com/Christophe-miranville)
      + [Estelle-Li-Zheng](https://github.com/Estelle-Li-Zheng)
      + [Ld-monkey](https://github.com/Ld-monkey)

   * Coté Back-end
      + [DidierLam](https://github.com/DidierLam)
      + [stephanebidard](https://github.com/stephanebidard)