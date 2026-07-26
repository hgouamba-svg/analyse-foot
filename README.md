# Lucide — Analyse sportive

Site web + application installable (PWA) pour l'analyse de matchs de football, connectée en direct à l'API [API-Football](https://www.api-football.com/).

## 1. Obtenir une clé API (gratuit, sans carte bancaire)

1. Va sur https://dashboard.api-football.com/register
2. Crée un compte
3. Récupère ta clé dans le dashboard ("API-KEY")
4. Plan gratuit = 100 requêtes/jour, remises à zéro à minuit UTC

## 2. Tester en local avant de publier

Ouvre simplement `index.html` dans ton navigateur (double-clic). Clique sur "Ouvrir l'app", puis colle ta clé API dans les réglages (icône ⚙).

## 3. Héberger le site (aucun compte développeur "lourd" requis)

Options simples, gratuites, sans carte bancaire :

- **Netlify Drop** (le plus simple) : va sur https://app.netlify.com/drop, glisse-dépose le dossier entier `lucide/`. Un lien public est généré immédiatement.
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

- **Ta clé API est visible** dans le code JavaScript par quiconque inspecte la page. Pour un usage personnel ou une démo, ce n'est pas grave. Si tu ouvres le site au public à grande échelle, quelqu'un pourrait épuiser ton quota de 100 requêtes/jour.
- **CORS** : si le navigateur bloque les appels vers `api-sports.io` (message d'erreur "réseau ou CORS" dans l'app), il faut passer par un petit serveur relais (proxy). Le fichier `proxy-worker.js` fourni ci-dessous est un exemple prêt à déployer gratuitement sur Cloudflare Workers en quelques minutes si ce cas se présente.

## 6. Si besoin : déployer le proxy CORS (Cloudflare Workers, gratuit)

1. Crée un compte gratuit sur https://workers.cloudflare.com
2. Crée un nouveau Worker, colle le contenu de `proxy-worker.js`
3. Dans les réglages du Worker, ajoute une variable d'environnement `API_KEY` avec ta clé API-Football (ainsi la clé n'est plus jamais exposée côté navigateur)
4. Récupère l'URL du Worker (ex. `https://ton-worker.ton-compte.workers.dev`)
5. Dans `app.html`, remplace la constante `API_BASE` par l'URL de ton Worker

## Structure du projet

```
lucide/
├── index.html          (page d'accueil / vitrine)
├── app.html             (l'application — dashboard live)
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
