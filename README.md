# Oplinbio-Linktree
Modèle de Linktree pour créer facilement sa page de Linktree sur Github

## Créer son Linktree à partir du modèle

1. **Copier le modèle** : sur la page GitHub du projet, cliquez sur **« Use this template » → « Create a new repository »** (ou faites un *fork*). Pour une adresse courte, nommez le dépôt `votre-pseudo.github.io`.
2. **Personnaliser** les textes, liens, couleurs et la photo (voir les sections ci-dessous).
3. **Publier avec GitHub Pages** : dans le dépôt, ouvrez **Settings → Pages**, choisissez **« Deploy from a branch »**, la branche `main` et le dossier `/ (root)`, puis enregistrez.
4. Après quelques minutes, la page est en ligne à l'adresse `https://votre-pseudo.github.io/nom-du-depot/` (ou `https://votre-pseudo.github.io/` si le dépôt s'appelle `votre-pseudo.github.io`). Reportez cette adresse dans le lien de partage de `index.html` (`id="lien"`).

> Pour les mainteneurs du projet : le bouton « Use this template » n'apparaît que si l'option **Settings → General → Template repository** est cochée sur le dépôt.

## Personnaliser le modèle

Remplacez les textes et liens d'exemple par les vôtres :

- **`index.html`** : nom (`Prénom Nom`), titre/accroche et texte de présentation (qui présentent Oplinbio par défaut), bouton d'appel à l'action, liens des réseaux sociaux et des boutons (`votre-compte`, `votre-chaine`…), et l'adresse de votre page dans le lien de partage (`https://votre-pseudo.github.io/votre-depot/`).
- **`images/photo-profil.svg`** : remplacez-la par votre photo (pensez à mettre à jour l'attribut `alt`).
- **`contact.vcf`** : vos coordonnées pour la fiche contact (le bouton de téléchargement est commenté dans l'en-tête de `index.html`).
- **`index.html`** : remplacez `VOTRE_ID_FORMSPREE` par l'identifiant de votre formulaire [Formspree](https://formspree.io/) (formulaire de l'accordéon « Me contacter »).
- **`CGU.html`** : remplacez `[Nom de l’éditeur]` et les `____` par vos informations.
- **`mentions-legales.html`** : complétez les éléments entre crochets (éditeur, directeur de la publication, durée de conservation des messages…) ; adaptez la partie « Hébergement » si vous n'utilisez pas GitHub Pages.
- **`accessibilite.html`** : la charte présente Oplinbio ; complétez la déclaration d'accessibilité (éléments entre crochets) après avoir fait auditer votre page.
- **`script.js`** : titre et texte utilisés lors du partage de la page (`TITRE_PARTAGE` et `TEXTE_PARTAGE`).

Des icônes sont prêtes pour de nombreux services (Spotify, GitHub, Substack, Medium, Mastodon, Bluesky, Threads, Reddit, formulaire Google…). Les liens commentés dans `index.html` (YouTube, Podcast, Clubhouse, Uncut) peuvent être réactivés en retirant les commentaires qui les entourent ; supprimez simplement les liens dont vous n'avez pas besoin.

### Couleurs et police

Les couleurs et les polices sont regroupées en variables au début de `style.css` (bloc `:root`) : changez une valeur et elle s'applique à tout le site.

| Variable | Rôle |
|---|---|
| `--couleur-principale` | Boutons de liens, en-têtes d'accordéons, pied de page, contours de focus |
| `--couleur-secondaire` | Fond de l'en-tête, de la présentation et des pages secondaires |
| `--couleur-tertiaire` | (facultative) Survol des boutons de liens |
| `--couleur-police` | Couleur des textes et des titres |
| `--police-titres` | Police des titres |
| `--police-texte-principale` | Police du texte et des liens du contenu de la page |
| `--police-texte-secondaire` | Police du texte et des liens de l'en-tête, du pied de page et des fenêtres |

Des variables complémentaires (couleur claire, couleurs du mode sombre) suivent dans le même bloc. Si vous changez de police, mettez aussi à jour le lien Google Fonts dans le `<head>` des pages.

### Appel à l'action

Sous la présentation, le bouton « Me contacter » ouvre le formulaire de contact. Vous pouvez changer son texte ou son lien (par exemple vers une inscription à une newsletter) dans le bloc `<p class="appelAction">` de `index.html`.

## Fonctionnalités

- **Mode clair / sombre** : le site suit automatiquement le réglage de l'appareil. L'interrupteur (soleil/lune) permet de choisir ; ce choix est mémorisé dans le navigateur et appliqué sur toutes les pages.
- **Partage** : le bouton Partager ouvre une fenêtre avec Facebook, X (Twitter), LinkedIn, Mastodon, Bluesky, Threads, Reddit, WhatsApp, l'e-mail, la copie du lien et, sur les appareils qui le permettent, le partage natif.
- **Paramètres d'accessibilité** : le bouton rond placé à côté de l'interrupteur clair/sombre ouvre [AccessConfig](https://accessconfig.a11y.fr) (Access42, licence MIT, dossier `accessconfig/`) pour choisir des contrastes renforcés ou inversés, une police adaptée à la dyslexie, l'interlignage, la justification et le remplacement des images par leur texte.
- **Accessibilité** : liens d'évitement, navigation au clavier, contours de focus visibles, mention « nouvel onglet » pour les lecteurs d'écran, respect du réglage « réduire les animations ».

## Numéro de version

Le numéro de version est affiché dans le pied de page (`Version 0.01`). À chaque mise à jour fusionnée sur `main` :

1. Augmentez le numéro dans le pied de page des quatre pages : `index.html`, `CGU.html`, `accessibilite.html` et `mentions-legales.html`.
2. Ajoutez une entrée dans [`CHANGELOG.md`](CHANGELOG.md) décrivant les changements.

## Catégories de liens

Sur `index.html`, les liens sont regroupés par catégorie dans des accordéons (`<details class="categorieLiens">`). Pour personnaliser :

- changez le titre d'une catégorie dans son `<summary>` ;
- déplacez les boutons de liens d'une catégorie à l'autre, ou copiez un bloc `<details>` pour créer une nouvelle catégorie ;
- ajoutez l'attribut `open` sur un `<details>` pour qu'une catégorie soit ouverte au chargement de la page.

Chaque lien est un élément `<li>` contenant un `<a class="boutonLien">`. Pour un lien qui s'ouvre dans un nouvel onglet, gardez `target="_blank" rel="noopener"` et le texte `<span class="sr-only">(nouvel onglet)</span>`, qui l'annonce aux lecteurs d'écran.

## Licence

Oplinbio est un logiciel libre distribué sous la **licence publique de l'Union européenne (EUPL) v. 1.2** : voir [`LICENSE`](LICENSE) et [`NOTICE`](NOTICE).

- Vous pouvez utiliser, étudier, modifier et partager le code, y compris pour proposer des services payants (hébergement, création de pages, offre en ligne…).
- Si vous distribuez une version modifiée, ou si vous la proposez en ligne à d'autres personnes, vous devez publier son code source sous la même licence (ou une licence compatible). Les contenus de votre page (textes, photos) restent les vôtres.
- La version française officielle de l'EUPL a la même valeur juridique que la version anglaise : https://interoperable-europe.ec.europa.eu/collection/eupl/eupl-text-eupl-12

Composants tiers : [AccessConfig](accessconfig/LICENSE.md) (Access42, licence MIT) et les icônes [Simple Icons](images/logo/logoLien/LICENCE-ICONES.md) (CC0).
