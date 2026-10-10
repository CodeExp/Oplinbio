# Journal des versions

Le numéro de version d'Oplinbio est affiché dans le pied de page de chaque page.
Il augmente à chaque mise à jour fusionnée sur la branche `main`.

## 0.01 (en préparation)

Première version du modèle Oplinbio.

### Modèle
- Modèle de page Linktree générique (accueil, CGU, accessibilité, mentions légales), à personnaliser ; guide « Créer son Linktree à partir du modèle » et publication avec GitHub Pages dans le README.
- Variables CSS de personnalisation (couleurs et police) regroupées au début de `style.css`.
- Numéro de version affiché dans le pied de page.

### Page d'accueil
- Liens classés par catégorie dans des accordéons (`<details>`/`<summary>`).
- Formulaire de contact intégré dans un accordéon « Me contacter », avec des étiquettes visibles.
- Bouton d'appel à l'action « Me contacter » sous la présentation.
- Fenêtre de partage : Facebook, X (Twitter), LinkedIn, WhatsApp, e-mail, copie du lien et partage natif de l'appareil.
- Mode sombre automatique selon le réglage de l'appareil, interrupteur avec pictos soleil/lune et choix mémorisé sur toutes les pages.
- Responsive : en-tête sur deux lignes sur mobile, photo et réseaux sociaux remontés avant la présentation, plus de débordement horizontal.

### Améliorations (après relecture)
- Licence libre EUPL 1.2 (fichiers `LICENSE` et `NOTICE`).
- Variables CSS réorganisées : couleurs principale, secondaire, tertiaire et de police ; polices des titres, de la zone principale et de la zone secondaire.
- Nouveaux boutons de partage (Mastodon, Bluesky, Threads, Reddit) et nouvelles icônes de liens (Mastodon, Bluesky, Threads, Reddit, Medium ; Substack activé).
- Pied de page identique sur toutes les pages : C.G.U., Accessibilité et Mentions légales, copyright 2026, plus aéré.
- Page `contact.html` supprimée (le formulaire est sur la page d'accueil) ; nouvelle page `mentions-legales.html` (modèle à compléter) ; page Accessibilité remplie (charte Oplinbio et modèle de déclaration).
- Bouton « Paramètres d'accessibilité » placé à côté de l'interrupteur clair/sombre (la barre du haut reste disponible, en commentaire).
- Espacement identique entre tous les accordéons de la page d'accueil.
- Texte de la page d'accueil présentant le projet Oplinbio tout en indiquant quoi remplacer.
- Variables CSS sans doublons : valeurs reprises avec `var()` et tailles dérivées calculées avec `calc()` (arrondis, focus, cibles tactiles, icônes, champs).
- Icônes de chaque réseau social disponibles dans les deux dossiers (`boutonReseau` et `logoLien`) ; la fenêtre de partage utilise les mêmes images que les boutons de réseaux sociaux.
- Boutons de réseaux sociaux : Bluesky affiché à la place de X (Twitter) ; X, Mastodon, Threads, Reddit et WhatsApp prêts à l'emploi en commentaire.
- Titulaire des droits : Code Expérience.

### Accessibilité
- AccessConfig (Access42) sur les quatre pages : contrastes, police adaptée à la dyslexie, interlignage, justification, remplacement des images.
- Liens d'évitement en haut de la page d'accueil.
- Liens simplifiés (plus de `<button>` imbriqué dans un `<a>`), liens et boutons regroupés dans des listes `<ul>`.
- Mention « (nouvel onglet) » pour les lecteurs d'écran et `rel="noopener"` sur les liens qui s'ouvrent dans un nouvel onglet.
- Bouton « Revenir en haut de la page » accessible (clavier, lecteurs d'écran, réduction des animations).
- Navigation au clavier : plus de `tabindex` positif ni d'élément non interactif recevant le focus, contours de focus visibles.
- Noms accessibles cohérents avec le texte visible (pied de page, mentions légales, bouton Accueil, formulaire de contact) ; lien C.G.U. annoncé « C.G.U. : conditions générales d'utilisation ».
