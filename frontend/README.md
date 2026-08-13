# ecoStock Frontend

Ce projet est l'interface utilisateur de l'application ecoStock, développée avec React.

## 1. Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 18.x ou plus récente recommandée)
- [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)

## 2. Installation

1.  Clonez le dépôt du projet (si ce n'est pas déjà fait).
2.  Naviguez jusqu'au répertoire `frontend` :

    ```bash
    cd frontend
    ```

3.  Installez les dépendances du projet :

    ```bash
    npm install
    ```

## 3. Configuration

### Variables d'environnement

L'application frontend a besoin de savoir où se trouve l'API backend. Pour cela, créez un fichier `.env` à la racine du dossier `frontend` :

```bash
touch .env
```

Ajoutez la ligne suivante dans ce fichier pour définir l'URL de l'API :

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

Cette variable est utilisée par le client API pour communiquer avec le backend.

### Configuration CORS du Backend

Pour que le frontend puisse envoyer des requêtes à l'API backend, le backend (tournant sur `http://127.0.0.1:8000`) doit autoriser les requêtes provenant du frontend.

Le frontend tourne par défaut sur `http://localhost:5173`. Assurez-vous que la configuration CORS du projet backend (dans `backend/config/settings.py`) inclut cette origine dans `CORS_ALLOWED_ORIGINS` :

```python
# backend/config/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## 4. Lancer l'application

Une fois les dépendances installées et la configuration terminée, vous pouvez lancer le serveur de développement du frontend :

```bash
npm run dev
```

L'application sera alors accessible à l'adresse http://localhost:5173. Le backend doit être en cours d'exécution pour que l'application fonctionne correctement.