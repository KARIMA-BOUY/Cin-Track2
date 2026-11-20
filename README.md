# CinéTrack

## Présentation du projet

CinéTrack est une application web qui permet de consulter un catalogue de films et de séries. Elle offre également des fonctionnalités d'administration et d'interaction avec les utilisateurs.

## Fonctionnalités

### 1. Catalogue
- Afficher la liste des films et des séries.
- Consulter les détails de chaque contenu.
- Afficher les informations dans une fenêtre modale.

### 2. Administration
- Consulter la liste des contenus.
- Ajouter un film ou une série.
- Modifier les informations d'un contenu.
- Supprimer un contenu après confirmation.
- Valider les données avant leur envoi.

### 3. Commentaires
- Afficher les commentaires associés à un film ou une série.
- Ajouter un commentaire.
- Afficher le nom de l'auteur, le texte et la date du commentaire.
- Mémoriser le pseudo de l'utilisateur avec localStorage.

## Technologies utilisées

- HTML5
- Tailwind CSS
- JavaScript ES6+
- Fetch API
- MockAPI
- Async / Await
- LocalStorage
- Modules JavaScript (Import / Export)

## Organisation du projet

```text
CineTrack/
│
├── index.html
├── admin.html
├── css/
├── js/
│   ├── api.js
│   ├── main.js
│   ├── ui.js
│   └── favorite.js
│
└── README.md
```

## API REST

Le projet utilise MockAPI pour gérer les données.

Les principales opérations sont :
- GET : récupérer les contenus et les commentaires.
- POST : ajouter un contenu ou un commentaire.
- PUT : modifier un contenu.
- DELETE : supprimer un contenu.


