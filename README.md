# Golum-Linktree
Modèle de Linktree pour créer facilement sa page de Linktree sur Github

## Personnaliser le modèle

Remplacez les textes et liens d'exemple par les vôtres :

- **`index.html`** : nom (`Prénom Nom`), titre/accroche, texte de présentation, liens des réseaux sociaux et des boutons (`votre-compte`, `votre-chaine`…), et l'adresse de votre page dans le lien de partage (`https://votre-pseudo.github.io/votre-depot/`).
- **`images/photo-profil.svg`** : remplacez-la par votre photo (pensez à mettre à jour l'attribut `alt`).
- **`contact.vcf`** : vos coordonnées pour la fiche contact.
- **`index.html`** et **`contact.html`** : remplacez `VOTRE_ID_FORMSPREE` par l'identifiant de votre formulaire [Formspree](https://formspree.io/) (le formulaire est aussi dans l'accordéon « Me contacter » de la page d'accueil).
- **`CGU.html`** : remplacez `[Nom de l’éditeur]` et les `____` par vos informations.
- **`script.js`** : titre et texte utilisés lors du partage de la page.

Les boutons de liens commentés dans `index.html` (YouTube, Podcast, Substack, Clubhouse, Uncut) peuvent être réactivés en retirant les commentaires qui les entourent.

## Numéro de version

Le numéro de version est affiché dans le pied de page (`Version 0.03`). À chaque mise à jour fusionnée sur `main` :

1. Augmentez le numéro dans le pied de page des quatre pages : `index.html`, `contact.html`, `CGU.html` et `accessibilite.html`.
2. Ajoutez une entrée dans [`CHANGELOG.md`](CHANGELOG.md) décrivant les changements.

## Catégories de liens

Sur `index.html`, les liens sont regroupés par catégorie dans des accordéons (`<details class="categorieLiens">`). Pour personnaliser :

- changez le titre d'une catégorie dans son `<summary>` ;
- déplacez les boutons de liens d'une catégorie à l'autre, ou copiez un bloc `<details>` pour créer une nouvelle catégorie ;
- ajoutez l'attribut `open` sur un `<details>` pour qu'une catégorie soit ouverte au chargement de la page.

Chaque lien est un élément `<li>` contenant un `<a class="boutonLien">`. Pour un lien qui s'ouvre dans un nouvel onglet, gardez `target="_blank" rel="noopener"` et le texte `<span class="sr-only">(nouvel onglet)</span>`, qui l'annonce aux lecteurs d'écran.
