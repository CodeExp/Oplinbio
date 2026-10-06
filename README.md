# Golum-Linktree
Modèle de Linktree pour créer facilement sa page de Linktree sur Github

## Créer son Linktree à partir du modèle

1. **Copier le modèle** : sur la page GitHub du projet, cliquez sur **« Use this template » → « Create a new repository »** (ou faites un *fork*). Pour une adresse courte, nommez le dépôt `votre-pseudo.github.io`.
2. **Personnaliser** les textes, liens, couleurs et la photo (voir les sections ci-dessous).
3. **Publier avec GitHub Pages** : dans le dépôt, ouvrez **Settings → Pages**, choisissez **« Deploy from a branch »**, la branche `main` et le dossier `/ (root)`, puis enregistrez.
4. Après quelques minutes, la page est en ligne à l'adresse `https://votre-pseudo.github.io/nom-du-depot/` (ou `https://votre-pseudo.github.io/` si le dépôt s'appelle `votre-pseudo.github.io`). Reportez cette adresse dans le lien de partage de `index.html` (`id="lien"`).

> Pour les mainteneurs du projet : le bouton « Use this template » n'apparaît que si l'option **Settings → General → Template repository** est cochée sur le dépôt.

## Personnaliser le modèle

Remplacez les textes et liens d'exemple par les vôtres :

- **`index.html`** : nom (`Prénom Nom`), titre/accroche, texte de présentation, bouton d'appel à l'action, liens des réseaux sociaux et des boutons (`votre-compte`, `votre-chaine`…), et l'adresse de votre page dans le lien de partage (`https://votre-pseudo.github.io/votre-depot/`).
- **`images/photo-profil.svg`** : remplacez-la par votre photo (pensez à mettre à jour l'attribut `alt`).
- **`contact.vcf`** : vos coordonnées pour la fiche contact (le bouton de téléchargement est commenté dans l'en-tête de `index.html`).
- **`index.html`** et **`contact.html`** : remplacez `VOTRE_ID_FORMSPREE` par l'identifiant de votre formulaire [Formspree](https://formspree.io/) (le formulaire est aussi dans l'accordéon « Me contacter » de la page d'accueil).
- **`CGU.html`** : remplacez `[Nom de l’éditeur]` et les `____` par vos informations.
- **`script.js`** : titre et texte utilisés lors du partage de la page (`TITRE_PARTAGE` et `TEXTE_PARTAGE`).

Les boutons de liens commentés dans `index.html` (YouTube, Podcast, Substack, Clubhouse, Uncut) peuvent être réactivés en retirant les commentaires qui les entourent.

### Couleurs et police

Les couleurs et la police sont regroupées en variables au début de `style.css` (bloc `:root`) : changez une valeur et elle s'applique à tout le site, en mode clair comme en mode sombre. Si vous changez de police, mettez aussi à jour le lien Google Fonts dans le `<head>` des pages.

### Appel à l'action

Sous la présentation, le bouton « Me contacter » ouvre le formulaire de contact. Vous pouvez changer son texte ou son lien (par exemple vers une inscription à une newsletter) dans le bloc `<p class="appelAction">` de `index.html`.

## Fonctionnalités

- **Mode clair / sombre** : le site suit automatiquement le réglage de l'appareil. L'interrupteur (soleil/lune) permet de choisir ; ce choix est mémorisé dans le navigateur et appliqué sur toutes les pages.
- **Partage** : le bouton Partager ouvre une fenêtre avec Facebook, X (Twitter), LinkedIn, WhatsApp, l'e-mail, la copie du lien et, sur les appareils qui le permettent, le partage natif.
- **Paramètres d'accessibilité** : le bouton en haut de chaque page ouvre [AccessConfig](https://accessconfig.a11y.fr) (Access42, licence MIT, dossier `accessconfig/`) pour choisir des contrastes renforcés ou inversés, une police adaptée à la dyslexie, l'interlignage, la justification et le remplacement des images par leur texte.
- **Accessibilité** : liens d'évitement, navigation au clavier, contours de focus visibles, mention « nouvel onglet » pour les lecteurs d'écran, respect du réglage « réduire les animations ».

## Numéro de version

Le numéro de version est affiché dans le pied de page (`Version 0.01`). À chaque mise à jour fusionnée sur `main` :

1. Augmentez le numéro dans le pied de page des quatre pages : `index.html`, `contact.html`, `CGU.html` et `accessibilite.html`.
2. Ajoutez une entrée dans [`CHANGELOG.md`](CHANGELOG.md) décrivant les changements.

## Catégories de liens

Sur `index.html`, les liens sont regroupés par catégorie dans des accordéons (`<details class="categorieLiens">`). Pour personnaliser :

- changez le titre d'une catégorie dans son `<summary>` ;
- déplacez les boutons de liens d'une catégorie à l'autre, ou copiez un bloc `<details>` pour créer une nouvelle catégorie ;
- ajoutez l'attribut `open` sur un `<details>` pour qu'une catégorie soit ouverte au chargement de la page.

Chaque lien est un élément `<li>` contenant un `<a class="boutonLien">`. Pour un lien qui s'ouvre dans un nouvel onglet, gardez `target="_blank" rel="noopener"` et le texte `<span class="sr-only">(nouvel onglet)</span>`, qui l'annonce aux lecteurs d'écran.
