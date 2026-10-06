# Journal des versions

Le numéro de version d'Oplinbio est affiché dans le pied de page de chaque page.
Il augmente à chaque mise à jour fusionnée sur la branche `main`.

## 0.03

- Liens d'évitement en haut de la page d'accueil (« Aller au contenu », « Aller aux liens », « Aller au formulaire de contact »), visibles au focus clavier.
- Liens simplifiés : les `<button>` imbriqués dans les `<a>` (et l'inverse) sont supprimés, chaque lien n'est plus qu'un `<a>` (une seule tabulation par lien). Les boutons Favoris et Partager deviennent de vrais `<button>`.
- Liens et boutons regroupés dans des listes `<ul>` : boutons du haut, réseaux sociaux, liens par catégorie et pied de page des quatre pages.
- Les liens qui s'ouvrent dans un nouvel onglet l'indiquent aux lecteurs d'écran (« (nouvel onglet) », classe `sr-only`) et utilisent `rel="noopener"`.
- Formulaire de contact intégré à la page d'accueil dans un accordéon « Me contacter », avec des étiquettes visibles ; il s'ouvre depuis le lien d'évitement et le lien « Me contacter » du pied de page.
- Contour de focus visible sur les liens et boutons de la page d'accueil (modes clair et sombre).
- Correction de l'erreur JavaScript sur la page d'accueil (interrupteur du mode sombre absent).

## 0.02

- Liens de la page d'accueil classés par catégorie dans des accordéons (`<details>`/`<summary>`) : « Vidéos & podcasts » (ouverte par défaut), « Projets & écrits » et « Contact & communautés ». Sans JavaScript, utilisables au clavier et annoncés par les lecteurs d'écran, avec contour de focus visible et prise en charge du mode sombre.

## 0.01

Première version du modèle Oplinbio.

- Modèle de page Linktree générique (accueil, contact, CGU, accessibilité), à personnaliser.
- Bouton « Revenir en haut de la page » accessible : utilisable au clavier, annoncé par les lecteurs d'écran, respect du réglage « réduire les animations », contour de focus visible, icône unique en flat design.
- Ordre de tabulation sans `tabindex` positif sur la page d'accueil.
- Numéro de version affiché dans le pied de page.
