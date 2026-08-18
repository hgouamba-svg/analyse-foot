# Statline — Analyse sportive

Site web + application installable (PWA) pour l'analyse de matchs de football, connectée en direct à l'API [Odds-API.io](https://odds-api.io/).

## 1. Obtenir une clé API (gratuit, sans carte bancaire)

1. Va sur https://odds-api.io et clique "Get Started Free"
2. Crée un compte (email, prénom, nom)
3. Ta clé arrive par email (vérifie aussi les spams)
4. Plan gratuit = 100 requêtes/heure, jusqu'à 500/jour, limité à **2 bookmakers** de ton choix (Statline utilise Bet365 + Unibet par défaut)

⚠️ **Important** : le plan gratuit fixe une fois pour toutes les 2 bookmakers autorisés sur ton compte. Si tu changes la liste dans `app.html`, réinitialise d'abord ta sélection via `PUT /v3/bookmakers/selected/clear?apiKey=TA_CLE` avant de refaire un appel, sinon l'API bloquera avec une erreur "Access denied".

## 2. Tester en local avant de publier

Ouvre simplement `index.html` dans ton navigateur (double-clic). Clique sur "Ouvrir l'app", puis colle ta clé API dans les réglages (icône ⚙).

## 3. Héberger le site (aucun compte développeur "lourd" requis)

Options simples, gratuites, sans carte bancaire :

- **Netlify Drop** (le plus simple) : va sur https://app.netlify.com/drop, glisse-dépose le dossier entier `statline/`. Un lien public est généré immédiatement.
- **GitHub Pages** : pousse ce dossier dans un dépôt GitHub, active "Pages" dans les réglages du dépôt.
- **Vercel** : `vercel deploy` depuis ce dossier (nécessite un compte gratuit).

## 4. Installer l'app sur mobile (PWA — sans passer par les stores)

Une fois le site en ligne (URL publique HTTPS obligatoire — les 3 options ci-dessus le font automatiquement) :

- **Android (Chrome)** : ouvre le site → menu ⋮ → "Ajouter à l'écran d'accueil" / "Installer l'application"
- **iPhone (Safari)** : ouvre le site → bouton Partager (carré + flèche) → "Sur l'écran d'accueil"

L'icône apparaît comme une vraie app, en plein écran, sans barre d'adresse.

## 5. Limite importante : CORS et sécurité de la clé

Ce projet appelle l'API directement depuis le navigateur (`app.html`), pour rester simple et ne nécessiter aucun serveur.
Deux limites à connaître :

- **Ta clé API est visible** dans le code JavaScript par quiconque inspecte la page. Pour un usage personnel ou une démo, ce n'est pas grave. Si tu ouvres le site au public à grande échelle, quelqu'un pourrait épuiser ton quota de 500 requêtes/jour.
- **CORS** : si le navigateur bloque les appels vers `api.odds-api.io` (message d'erreur "réseau ou CORS" dans l'app), il faut passer par un petit serveur relais (proxy). Le fichier `proxy-worker.js` fourni est un exemple prêt à déployer gratuitement sur Cloudflare Workers — adapte l'URL cible (`v3.football.api-sports.io`) vers `api.odds-api.io` si tu l'utilises.

## 6. Si besoin : déployer un proxy CORS (Cloudflare Workers, gratuit)

1. Crée un compte gratuit sur https://workers.cloudflare.com
2. Crée un nouveau Worker, adapte le contenu de `proxy-worker.js` pour cibler `https://api.odds-api.io`
3. Dans les réglages du Worker, ajoute une variable d'environnement `API_KEY` avec ta clé Odds-API.io (ainsi la clé n'est plus jamais exposée côté navigateur)
4. Récupère l'URL du Worker (ex. `https://ton-worker.ton-compte.workers.dev`)
5. Dans `app.html`, remplace la constante `API_BASE` par l'URL de ton Worker

## Structure du projet

```
statline/
├── index.html          (page d'accueil / vitrine, design "niveaux de lecture")
├── app.html             (l'application — dashboard live)
├── tarifs.html           (page tarifs : Gratuit / Pro)
├── manifest.json         (config PWA)
├── sw.js                 (service worker, installation hors-ligne du shell)
├── proxy-worker.js       (proxy CORS optionnel, Cloudflare Workers)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Roadmap (produit plus large que le football)

`index.html` est déjà structuré avec une section "Modules" pensée pour accueillir d'autres sports/fonctionnalités à côté du football, sans tout reconstruire.
