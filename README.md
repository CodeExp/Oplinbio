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
- **`site.webmanifest`** : nom (`name`, `short_name`), description et couleurs de la page une fois installée sur un appareil. Remplacez aussi les icônes du dossier `images/icones/` (PNG carrés de 192 × 192 et 512 × 512 pixels, et `apple-touch-icon.png` de 180 × 180 pixels pour iPhone et iPad) par votre photo ou votre logo.

### Réseaux sociaux et liens disponibles

Des éléments sont prêts à l'emploi dans `index.html`. Pour en afficher un, retirez les commentaires `<!-- … -->` qui l'entourent ; pour en masquer un, entourez-le de commentaires ou supprimez-le.

- **Boutons de réseaux sociaux** (sous la photo) : Instagram, Bluesky, LinkedIn et Facebook sont affichés ; **X (Twitter), Mastodon, Threads, Reddit et WhatsApp sont présents mais commentés**.
- **Boutons de liens** (accordéons) : Spotify, GitHub, Substack, Medium, Mastodon, Bluesky, Threads, Reddit et formulaire Google sont affichés ; YouTube, Podcast, Clubhouse et Uncut sont commentés.

Les icônes de chaque réseau existent dans les deux dossiers d'images, pour pouvoir utiliser le même logo partout :

- `images/logo/boutonReseau/` : icônes carrées des boutons de réseaux sociaux, également utilisées dans la fenêtre de partage ;
- `images/logo/logoLien/` : icônes des boutons de liens.

Chaque icône a une variante `…Hover.svg` affichée au survol.

### Couleurs, polices et formes

Les couleurs, les polices et les formes sont regroupées en variables au début de `style.css` (bloc `:root`) : changez une valeur et elle s'applique à tout le site. Pour éviter les doublons, certaines variables reprennent une autre variable avec `var()` (par exemple `--couleur-police: var(--couleur-principale)`) ou en sont calculées avec `calc()` (par exemple `--arrondi-pilule: calc(var(--arrondi) * 3.5)`) : elles suivent automatiquement ses changements, et vous pouvez leur donner leur propre valeur si besoin.

| Variable | Rôle |
|---|---|
| `--couleur-principale` | Boutons de liens, en-têtes d'accordéons, pied de page, contours de focus |
| `--couleur-secondaire` | Fond de l'en-tête, de la présentation et des pages secondaires |
| `--couleur-tertiaire` | (facultative) Survol des boutons de liens |
| `--couleur-police` | Couleur des textes et des titres (par défaut : la couleur principale) |
| `--police-titres` | Police des titres |
| `--police-texte-principale` | Police du texte et des liens du contenu de la page (par défaut : celle des titres) |
| `--police-texte-secondaire` | Police du texte et des liens de l'en-tête, du pied de page et des fenêtres (par défaut : celle de la zone principale) |
| `--arrondi`, `--arrondi-pilule` | Arrondi des champs et boutons ; celui des boutons en pilule en est calculé |
| `--epaisseur-focus`, `--decalage-focus` | Contour de focus clavier |
| `--taille-cible` | Taille minimale des petits boutons (44 px) |
| `--taille-icone-lien` | Taille des icônes des boutons de liens (réduite par calcul sur tablette) |
| `--largeur-champ`, `--marge-champ`, `--bordure-champ` | Champs du formulaire ; la largeur des étiquettes en est calculée |

Des variables complémentaires (couleur claire, couleurs du mode sombre) suivent dans le même bloc. Si vous changez de police, mettez aussi à jour le lien Google Fonts dans le `<head>` des pages.

### Appel à l'action

Sous la présentation, le bouton « Me contacter » ouvre le formulaire de contact. Vous pouvez changer son texte ou son lien (par exemple vers une inscription à une newsletter) dans le bloc `<p class="appelAction">` de `index.html`.

## Fonctionnalités

- **Mode clair / sombre** : le site suit automatiquement le réglage de l'appareil. L'interrupteur (soleil/lune) permet de choisir ; ce choix est mémorisé dans le navigateur et appliqué sur toutes les pages.
- **Partage** : le bouton Partager ouvre une fenêtre avec Facebook, X (Twitter), LinkedIn, Mastodon, Bluesky, Threads, Reddit, WhatsApp, l'e-mail, la copie du lien et, sur les appareils qui le permettent, le partage natif.
- **Garder cette page** : en bas de la fenêtre de partage, une rubrique explique comment ajouter la page aux favoris selon l'appareil du visiteur (<kbd>Ctrl</kbd> + <kbd>D</kbd>, <kbd>⌘</kbd> + <kbd>D</kbd> sur Mac, menu Partager sur iPhone et iPad, menu du navigateur sur Android) : aucun navigateur ne permet à une page d'ajouter elle-même un favori. Quand le navigateur le propose (Chrome, Edge, Android… sur une adresse en `https`, comme GitHub Pages), un bouton **« Installer sur l'appareil »** permet aussi d'installer la page comme une application, grâce au fichier `site.webmanifest`.
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
