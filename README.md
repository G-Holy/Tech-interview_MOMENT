# Test Technique MOMENT

Création d'un système d'authentification pour la société MyClient.

# Pour commencer

Pour démarrer le serveur en local :

- Cloner le projet
- `npm install` pour installer les dépendances
- Installer MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) démarrer son service en exécutant la commande `mongod`
- `npm run dev` pour démarrer le serveur en local

# Revue du code

## Dépendances

- [express](https://github.com/expressjs/express) - Le serveur pour gérer et envoyer des requêtes HTTP
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Permet de générer et de gérer des tokens d'authentification
- [mongoose](https://github.com/Automattic/mongoose) - ORM pour créer et modifier des données avec MongoDB
- [bcryptjs](https://github.com/kelektiv/node.bcrypt.js) - Pour manipuler et hasher des mots de passe
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - Permet de lire les commentaires JSDoc et générer un objet de spécification OpenAPI Swagger
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Génère et expose une page de documentation Swagger OpenAPI
- [jsdoc](https://github.com/jsdoc/jsdoc) - Générer des commentaires structurés dans le code pour le documenter 
- [morgan](https://github.com/expressjs/morgan) - Logger de requête HTTP
- [winston](https://github.com/winstonjs/winston) - Outil de gestion des logs
- [nodemon](https://github.com/remy/nodemon) - Permet de redémarrer automatiquement l'application à chaque changement du code
- [env-cmd](https://github.com/toddbluhm/env-cmd) - Gère les fichiers .env



## Structure de l'application

L'application est architecturée en MVC (Model, view, controller) orienté services. Le principe est de séparer la logique métier du reste de l'application. Ce modèle d'architecture vise à rendre l'application scalable, modulable et facile à tester.

`index.js`
Le point d'entrée de l'application. Ce fichier initialise le serveur web express et se connecte à la base de données MongoDB avec mongoose.

`config/`
Contient les fichiers d'environnements et de configuration de l'application.

`loaders/`
Contient les loaders pour Express et MongoDB.
Le but des loaders est d'abstraire et d'encapsuler tous les processus de démarrage de notre application. Le maintient du code est plus aisé et cela nous permet de changer de framework et d'outils plus facilement

`src/models/`
Contient les modèles de données Mongoose.

`src/middlewares/`
Contient les fonctions middleware de l'application :
- Un middleware d'authentification
- Un middlewared de Validation des données pour les controllers

`src/routes/`
Contient les routes express et leurs définitions.

`src/controllers/`
Contient les contrôleurs express des routes.
Les contrôleurs s'occupent de gérer et de répondre aux requêtes HTTP du client. Ils ne doivent pas contenir la logique métier, ils extraient les données contenues dans le corps d'une requête pour les transmettre aux services.

`src/services/`
Encapsule toute la logique métier.
Un service interprête la donnée et envoi une réponse aux contrôleurs, c'est le cerveau de l'application. Les services ne doivent pas dépendre d'un framework, ils n'interagissent pas directement avec la base de données.

`src/services/db/MongooseService.js`
C'est la couche de manipulation de la donnée. Ce fichier contient une classe d'abstraction qui s'occupe de toutes les interactions avec la base de données.

## Documentation

Une route "/api-docs" expose un déscriptif des routes de l'application.

Nous utilisons Swagger ainsi que JSDoc pour documenter le code.<br />
(https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do)


## Gestion d'erreur

Le middleware de gestion des erreurs est définit dans le loader Express. Il s'occupe de vérifier si l'erreur contient un champ "status" et "message" afin de renvoyer un message adapté au client.

## Authentification

Les requêtes sont authentifiées en utilisant le header "Authorization" avec un JWT valide. C'est un middleware défini dans `src/middlewares/auth.js` qui vérifi ce header pour chaque requête. Si le token est invalide ou absent une réponse est envoyée au client avec le code HTTP 401.


<br />
