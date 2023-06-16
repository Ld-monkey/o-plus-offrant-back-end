<!--
  Titre du projet. DONE
  Description du projet. DONE
  Comment installer et exécuter le projet.
        créer une BDD
        créer l'utilisateur de la BDD
        premières tables ?
        récupérer les modules (npm install)
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

## :books: Description

Le projet 6 nommé **O + Offrant** est un site d'enchère destiné aux particuliers majeurs.
Il permet de déposer un article de son choix et ou d'enchérir avec des tokens afin de remporter un lot.

## 📦 Installation

### Dépendances 

Pour installer les dépendances du projet :

```bash
yarn
```

### Configuration l'API back-end

Configurer l'url par défault du serveur back-end:

```bash
# Copier l'exemple de l'environnement
cp .env.example .env

# Configurer l'url
nano .env
```

Dans le fichier **.env** définir l'url (exemple):

```bash
VITE_AXIOS_SERVER='https://vote-url-api-par-default.com'
```

## 🪄 Usage

Pour lancer le site en [localhost](http://localhost:5173/) :

```bash
yarn dev
```

## ✨ Contributeurs

   * Coté Front-end
      + [Christophe-miranville](https://github.com/Christophe-miranville)
      + [Estelle-Li-Zheng](https://github.com/Estelle-Li-Zheng)
      + [Ld-monkey](https://github.com/Ld-monkey)

   * Coté Back-end
      + [DidierLam](https://github.com/DidierLam)
      + [stephanebidard](https://github.com/stephanebidard)