# ecoStock API

Documentation des endpoints de l’API REST d’ecoStock.

Ce guide est pensé pour être suivi étape par étape par quelqu’un qui découvre Django et les API REST.

## 1. Prérequis

Avant de lancer le projet, il faut avoir :

- Python 3.10 ou plus récent
- pip installé
- un environnement virtuel

### Créer et activer l’environnement virtuel

Sur Windows PowerShell :

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Installer les dépendances :

```powershell
pip install -r requirements.txt
```

Si le fichier requirements.txt n’existe pas, installez au minimum :

```powershell
pip install django djangorestframework djangorestframework-simplejwt
```

## 2. Lancer le projet

Depuis la racine du projet :

```powershell
python manage.py migrate
python manage.py runserver
```

L’API sera disponible sur :

```text
http://127.0.0.1:8000/
```

## 3. Créer des données de test

### Créer un entrepôt

```powershell
python manage.py shell
```

Puis exécuter :

```python
from warehouse.models import WareHouse
WareHouse.objects.create(name="Entrepôt A", location="Paris", capacity=100)
WareHouse.objects.create(name="Entrepôt B", location="Lyon", capacity=200)
```

### Créer un produit

```python
from produits.models import Product
from warehouse.models import WareHouse
from django.utils import timezone

warehouse = WareHouse.objects.first()
Product.objects.create(
    name="Lait",
    quantity=20,
    expiration_date=timezone.now().date(),
    warehouse=warehouse,
)
```

### Créer un utilisateur pour l’authentification

```powershell
python manage.py createsuperuser
```

Puis connectez-vous via l’endpoint de token :

```http
POST /api/v1/token
Content-Type: application/json

{
  "username": "votre_nom",
  "password": "votre_mot_de_passe"
}
```

La réponse contient un `access` et un `refresh`.

## Authentification

L’API utilise des tokens JWT.

- `POST /api/v1/token` : obtenir un access token et un refresh token
- `POST /api/v1/refresh` : rafraîchir le token d’accès

## Endpoints exposés

### Produits

- `GET /api/v1/products/` : lister les produits
- `GET /api/v1/products/?warehouse=<id>` : lister les produits filtrés par entrepôt
- `POST /api/v1/products/` : créer un produit
- `GET /api/v1/products/{id}/` : récupérer un produit précis
- `PUT /api/v1/products/{id}/` : remplacer complètement un produit
- `PATCH /api/v1/products/{id}/` : modifier seulement certains champs
- `DELETE /api/v1/products/{id}/` : supprimer un produit
- `POST /api/v1/products/{id}/move/` : déplacer un produit vers un autre entrepôt
- `GET /api/v1/products/stats/` : obtenir des statistiques globales sur les produits

Exemple avec curl :

```powershell
curl -X GET http://127.0.0.1:8000/api/v1/products/ -H "Authorization: Bearer VOTRE_TOKEN"
```

Exemple de création de produit :

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/products/ -H "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json" -d "{\"name\":\"Yaourt\",\"quantity\":10,\"expiration_date\":\"2026-12-31\",\"warehouse\":1}"
```

### Entrepôts

- `GET /api/v1/warehouse/` : lister les entrepôts
- `POST /api/v1/warehouse/` : créer un entrepôt
- `GET /api/v1/warehouse/{id}/` : récupérer un entrepôt précis
- `PUT /api/v1/warehouse/{id}/` : remplacer complètement un entrepôt
- `PATCH /api/v1/warehouse/{id}/` : modifier seulement certains champs
- `DELETE /api/v1/warehouse/{id}/` : supprimer un entrepôt
- `GET /api/v1/warehouse/{id}/audit/` : obtenir le nombre de produits associés à un entrepôt

Exemple avec curl :

```powershell
curl -X GET http://127.0.0.1:8000/api/v1/warehouse/ -H "Authorization: Bearer VOTRE_TOKEN"
```

## Documentation OpenAPI (exemple)

```yaml
openapi: 3.0.3
info:
  title: ecoStock API
  version: 1.0.0
  description: API de gestion des produits et des entrepôts.
servers:
  - url: http://localhost:8000/api/v1
paths:
  /products:
    get:
      summary: Lister les produits
      responses:
        '200':
          description: Liste des produits
    /products/stats:
      get:
        summary: Obtenir des statistiques sur les produits
        responses:
          '200':
          description: Liste des produits
    post:
      summary: Créer un produit
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, quantity, expiration_date, warehouse]
              properties:
                name:
                  type: string
                quantity:
                  type: integer
                expiration_date:
                  type: string
                  format: date
                warehouse:
                  type: integer
      responses:
        '201':
          description: Produit créé

  /products/{id}/move:
    post:
      summary: Déplacer un produit vers un entrepôt
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [warehouse]
              properties:
                warehouse:
                  type: integer
      responses:
        '200':
          description: Produit déplacé avec succès
        '400':
          description: Validation métier échouée

  /warehouse:
    get:
      summary: Lister les entrepôts
      responses:
        '200':
          description: Liste des entrepôts
    post:
      summary: Créer un entrepôt
      responses:
        '201':
          description: Entrepôt créé

  /warehouse/{id}/audit:
    get:
      summary: Obtenir le nombre de produits associés à un entrepôt
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Résultat de l’audit
```

## Flux métier du transfert de produit

Le transfert d’un produit suit ce schéma métier avant toute mise à jour :

```mermaid
flowchart TD
    A[Requête POST /products/{id}/move] --> B[Vérifier l'existence du produit]
    B -->|Non| C[Retour 400 - produit introuvable]
    B -->|Oui| D[Valider la présence du champ warehouse]
    D -->|Absent ou vide| E[Retour 400 - champ warehouse obligatoire]
    D -->|Présent| F[Vérifier l'existence de l'entrepôt cible]
    F -->|Non| G[Retour 400 - entrepôt introuvable]
    F -->|Oui| H[Vérifier la date d'expiration]
    H -->|Expirée| I[Retour 400 - déplacement refusé]
    H -->|Valide| J[Mettre à jour le warehouse du produit]
    J --> K[Enregistrer la modification]
    K --> L[Retour 200 - produit déplacé]
```

### Règles de validation métier

1. Le produit doit exister.
2. Le champ `warehouse` doit être fourni dans le corps de la requête.
3. L’entrepôt cible doit exister.
4. La date d’expiration du produit ne doit pas être passée.
5. Si l’une de ces validations échoue, l’API retourne une erreur `400`.
6. En cas de succès, le produit est réaffecté à l’entrepôt demandé et la mutation est enregistrée.

### Exemple de requête

```http
POST /api/v1/products/1/move/
Content-Type: application/json
Authorization: Bearer <token>

{
  "warehouse": 2
}
```

### Exemple avec curl

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/products/1/move/ -H "Authorization: Bearer VOTRE_TOKEN" -H "Content-Type: application/json" -d "{\"warehouse\":2}"
```

### Cas possibles

- Si `warehouse` manque : l’API renvoie une erreur `400` avec le message indiquant que le champ est obligatoire.
- Si le produit est expiré : l’API renvoie une erreur `400` avec un message de refus de déplacement.
- Si l’entrepôt demandé n’existe pas : l’API renvoie une erreur `400`.
- Si tout est correct : l’API renvoie `200` avec le message `Produit déplacé`.

### Exemple de réponse réussie

```json
{
  "message": "Produit déplacé"
}
```
