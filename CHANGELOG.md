# Journal des versions

Le numéro de version d'Oplinbio est affiché dans le pied de page de chaque page.
Il augmente à chaque mise à jour fusionnée sur la branche `main`.

## 0.01 (en préparation)

Première version du modèle Oplinbio.

### Modèle
- Modèle de page Linktree générique (accueil, contact, CGU, accessibilité), à personnaliser ; guide « Créer son Linktree à partir du modèle » et publication avec GitHub Pages dans le README.
- Variables CSS de personnalisation (couleurs et police) regroupées au début de `style.css`.
- Numéro de version affiché dans le pied de page.

### Page d'accueil
- Liens classés par catégorie dans des accordéons (`<details>`/`<summary>`).
- Formulaire de contact intégré dans un accordéon « Me contacter », avec des étiquettes visibles.
- Bouton d'appel à l'action « Me contacter » sous la présentation.
- Fenêtre de partage : Facebook, X (Twitter), LinkedIn, WhatsApp, e-mail, copie du lien et partage natif de l'appareil.
- Mode sombre automatique selon le réglage de l'appareil, interrupteur avec pictos soleil/lune et choix mémorisé sur toutes les pages.
- Responsive : en-tête sur deux lignes sur mobile, photo et réseaux sociaux remontés avant la présentation, plus de débordement horizontal.

### Accessibilité
- AccessConfig (Access42) sur les quatre pages : contrastes, police adaptée à la dyslexie, interlignage, justification, remplacement des images.
- Liens d'évitement en haut de la page d'accueil.
- Liens simplifiés (plus de `<button>` imbriqué dans un `<a>`), liens et boutons regroupés dans des listes `<ul>`.
- Mention « (nouvel onglet) » pour les lecteurs d'écran et `rel="noopener"` sur les liens qui s'ouvrent dans un nouvel onglet.
- Bouton « Revenir en haut de la page » accessible (clavier, lecteurs d'écran, réduction des animations).
- Navigation au clavier : plus de `tabindex` positif ni d'élément non interactif recevant le focus, contours de focus visibles.
- Noms accessibles cohérents avec le texte visible (pied de page, mentions légales, bouton Accueil, formulaire de `contact.html`).
