# ecoStock

Application full-stack composée de :
- un backend Django REST API
- un frontend React + Vite
- une base de données SQLite en environnement de développement

L'objectif de l'application est de gérer des produits et des entrepôts, avec authentification JWT et interface web pour interagir avec l'API.

## Architecture du projet

```text
EcostockReactDjango/
├── backend/               # API Django
│   ├── config/            # paramètres Django
│   ├── produits/          # application produits
│   ├── warehouse/         # application entrepôts
│   ├── manage.py
│   └── requirements.txt
├── frontend/              # application React
│   ├── src/
│   ├── package.json
│   └── .env.example
├── README.md              # documentation globale
└── .gitignore
```

## Prérequis

Avant de lancer le projet, vérifiez que vous avez installé :

- Python 3.10+
- pip
- Node.js 18+
- npm
- Git

## 1) Configuration du backend Django

### 1.1. Se placer dans le dossier backend

```bash
cd backend
```

### 1.2. Créer et activer un environnement virtuel

Sur Windows PowerShell :

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Sur macOS / Linux :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 1.3. Installer les dépendances

```bash
pip install -r requirements.txt
```

Si le fichier `requirements.txt` n'est pas présent ou incomplet, installez au minimum :

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

### 1.4. Appliquer les migrations

```bash
python manage.py migrate
```

### 1.5. Démarrer l'API

Par défaut, Django écoute sur le port `8000` :

```bash
python manage.py runserver 127.0.0.1:8000
```

L'API sera accessible à l'adresse :

```text
http://127.0.0.1:8000/
```

### 1.6. Base de données

En développement, le projet utilise SQLite par défaut :

```text
backend/db.sqlite3
```

Vous pouvez créer un superutilisateur si vous souhaitez tester l'authentification admin :

```bash
python manage.py createsuperuser
```

## 2) Configuration du frontend React

### 2.1. Se placer dans le dossier frontend

```bash
cd frontend
```

### 2.2. Installer les dépendances

```bash
npm install
```

### 2.3. Créer le fichier `.env`

À la racine du dossier `frontend`, créer un fichier `.env` avec la variable suivante :

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

Cette variable permet au frontend de savoir où joindre l'API Django.

### 2.4. Lancer le frontend

Le frontend Vite tourne par défaut sur le port `5173` :

```bash
npm run dev
```

L'application sera accessible à l'adresse :

```text
http://localhost:5173
```

Pour forcer l'accès sur l'interface réseau / hébergement local, vous pouvez aussi utiliser :

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

## 3) Configuration CORS

Le backend et le frontend doivent communiquer sur des ports différents :
- Backend : `http://127.0.0.1:8000`
- Frontend : `http://localhost:5173` ou `http://127.0.0.1:5173`

Dans le fichier `backend/config/settings.py`, assurez-vous d'avoir une configuration de type :

```python
INSTALLED_APPS = [
    'corsheaders',
    ...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True
```

Et si nécessaire :

```python
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
```

Cela permet au frontend d'envoyer des requêtes avec les headers JWT (Authorization: Bearer ...).

## 4) Lancer l'application complète

### Option recommandée

Dans deux terminaux distincts :

Terminal 1 - Backend

```bash
cd backend
python manage.py runserver 127.0.0.1:8000
```

Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Ensuite ouvrez dans le navigateur :

```text
http://localhost:5173
```

## 5) Variables d'environnement utiles

### Frontend

Fichier `frontend/.env` :

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

### Backend

Le backend n'exige pas de fichier `.env` dans cette version de développement, mais si vous voulez exposer l'application sur un autre port ou autoriser d'autres domaines, pensez à adapter :

- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- le port utilisé par Django (`runserver 127.0.0.1:8000`)

## 6) Vérification rapide

Une fois les deux services lancés :

- le backend répond sur `http://127.0.0.1:8000`
- le frontend est accessible sur `http://localhost:5173`
- les requêtes du frontend vers l'API doivent être autorisées par CORS

## 7) Authentification JWT

L'API utilise des tokens JWT. Le frontend doit récupérer un token via les endpoints Django REST Framework Simple JWT, puis l'utiliser dans les requêtes protégées.

Exemple d'endpoint utilisé pour l'obtention du token :

```http
POST /api/v1/token
Content-Type: application/json
```

Exemple de corps :

```json
{
  "username": "votre_nom",
  "password": "votre_mot_de_passe"
}
```

## 8) Résumé des ports

```text
Backend API : http://127.0.0.1:8000
Frontend    : http://localhost:5173
```

## 9) Dépannage rapide

### Le frontend ne peut pas appeler l'API

Vérifiez que :
- le backend est bien lancé
- `VITE_API_URL` est correct
- `CORS_ALLOWED_ORIGINS` contient `http://localhost:5173` ou `http://127.0.0.1:5173`
- les deux services ne sont pas arrêtés

### Le backend ne répond pas

Vérifiez que :
- votre environnement virtuel est activé
- les dépendances Django sont installées
- `python manage.py migrate` a bien été exécuté
- le port `8000` n'est pas déjà utilisé par un autre service

### Le frontend ne s'ouvre pas

Vérifiez que :
- `npm install` a bien été exécuté
- le port `5173` n'est pas occupé
- le serveur Vite tourne correctement via `npm run dev`

## 10) Commandes de lancement condensées

Backend :

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# ou .\.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

Frontend :

```bash
cd frontend
npm install
cp .env.example .env 2>/dev/null || true
npm run dev
```

Note : si le dépôt ne contient pas de `.env.example`, créez simplement un fichier `.env` avec :

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

## Conclusion

Pour lancer l'application complète, il suffit de démarrer le backend Django sur le port `8000`, le frontend React sur le port `5173`, et de configurer correctement les variables d'environnement et la règle CORS. Une fois ces étapes effectuées, vous pouvez utiliser l'application dans votre navigateur via `http://localhost:5173`.
