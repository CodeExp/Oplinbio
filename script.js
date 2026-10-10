// Mode clair / mode sombre
// - Sans choix enregistré, le site suit le réglage de l'appareil (prefers-color-scheme).
// - L'interrupteur permet de choisir ; ce choix est mémorisé dans le navigateur
//   et appliqué sur toutes les pages du site.

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;
const CLE_THEME = 'oplinbio-theme';
const preferenceSysteme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function lireChoixTheme() {
    try {
        return localStorage.getItem(CLE_THEME);
    } catch (erreur) {
        return null;
    }
}

function enregistrerChoixTheme(theme) {
    try {
        localStorage.setItem(CLE_THEME, theme);
    } catch (erreur) {
        // Stockage indisponible (navigation privée…) : le choix vaut pour cette page seulement
    }
}

function appliquerTheme(sombre) {
    body.classList.toggle('dark-mode', sombre);
    if (themeSwitch) {
        themeSwitch.setAttribute('aria-checked', sombre ? 'true' : 'false');
    }
}

function themeInitialEstSombre() {
    const choix = lireChoixTheme();
    if (choix === 'sombre' || choix === 'clair') {
        return choix === 'sombre';
    }
    return preferenceSysteme ? preferenceSysteme.matches : false;
}

appliquerTheme(themeInitialEstSombre());

// Suit les changements de réglage de l'appareil tant qu'aucun choix n'a été fait
if (preferenceSysteme) {
    const suivreSysteme = function (evenement) {
        if (!lireChoixTheme()) {
            appliquerTheme(evenement.matches);
        }
    };
    if (preferenceSysteme.addEventListener) {
        preferenceSysteme.addEventListener('change', suivreSysteme);
    } else if (preferenceSysteme.addListener) {
        preferenceSysteme.addListener(suivreSysteme);
    }
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', function () {
        const sombre = !body.classList.contains('dark-mode');
        appliquerTheme(sombre);
        enregistrerChoixTheme(sombre ? 'sombre' : 'clair');
    });
}

// Garder cette page (rubrique de la fenêtre de partage)
// - Aucun navigateur ne permet à une page d'ajouter elle-même un favori :
//   on explique donc comment faire, selon l'appareil du visiteur.
// - Le bouton « Installer sur l'appareil » n'apparaît que si le navigateur
//   propose l'installation (Chrome, Edge, Android… sur une adresse en https).

function texteAideFavoris() {
    const agent = navigator.userAgent || '';
    const plateforme = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    // Les iPad récents se présentent comme un Mac : on les reconnaît à leur écran tactile
    const ios = /iPhone|iPad|iPod/.test(agent) || (/Mac/.test(plateforme) && navigator.maxTouchPoints > 1);
    if (ios) {
        return 'Pour la retrouver facilement, touchez le bouton Partager de Safari, puis «\u00a0Ajouter aux favoris\u00a0» ou «\u00a0Sur l\'écran d\'accueil\u00a0».';
    }
    if (/Android/.test(agent)) {
        return 'Pour la retrouver facilement, ouvrez le menu de votre navigateur, puis touchez l\'étoile ou «\u00a0Ajouter à l\'écran d\'accueil\u00a0».';
    }
    const raccourci = /Mac/.test(plateforme) ? '⌘ + D' : 'Ctrl + D';
    return 'Pour la retrouver facilement, ajoutez-la à vos favoris\u00a0: appuyez sur ' + raccourci + ' ou utilisez le menu de votre navigateur.';
}

function preparerAideFavoris() {
    const aide = document.getElementById('aideFavoris');
    if (aide) {
        aide.textContent = texteAideFavoris();
    }
}

// Proposition d'installation gardée par le navigateur jusqu'au clic sur le bouton
let propositionInstallation = null;

function afficherBoutonInstaller(visible) {
    const installerItem = document.getElementById('installerItem');
    if (installerItem) {
        installerItem.hidden = !visible;
    }
}

window.addEventListener('beforeinstallprompt', function (evenement) {
    // Pas de bandeau automatique : l'installation est proposée dans la fenêtre de partage
    evenement.preventDefault();
    propositionInstallation = evenement;
    afficherBoutonInstaller(true);
});

window.addEventListener('appinstalled', function () {
    propositionInstallation = null;
    afficherBoutonInstaller(false);
});

function installerApplication() {
    if (!propositionInstallation) {
        return;
    }
    const proposition = propositionInstallation;
    proposition.prompt();
    proposition.userChoice.then(function (choix) {
        if (choix.outcome !== 'accepted') {
            return;
        }
        // La proposition ne sert qu'une fois : on retire le bouton, en replaçant d'abord
        // le focus sur le titre de la fenêtre pour ne pas le perdre
        propositionInstallation = null;
        const titre = document.getElementById('titrePartage');
        if (titre) {
            titre.setAttribute('tabindex', '-1');
            titre.focus();
        }
        afficherBoutonInstaller(false);
        afficherMessagePartage('La page est installée sur votre appareil.');
    }).catch(function () {
        // Installation impossible : le bouton reste disponible
    });
}


// Fenêtre de partage : réseaux sociaux, e-mail, copie du lien
// et partage natif de l'appareil quand il est disponible.

const TITRE_PARTAGE = 'Linktree Prénom Nom';
const TEXTE_PARTAGE = 'Retrouvez tous les liens de Prénom Nom';

function adressePartagee() {
    const lien = document.getElementById('lien');
    return lien ? lien.href : window.location.href;
}

function preparerLiensPartage() {
    const url = encodeURIComponent(adressePartagee());
    const texte = encodeURIComponent(TEXTE_PARTAGE);
    const liens = {
        partageFacebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
        partageTwitter: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + texte,
        partageLinkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
        // Mastodon : Toot! (outil libre) demande l'instance du visiteur avant de partager
        partageMastodon: 'https://toot.kytta.dev/?text=' + texte + '%20' + url,
        partageBluesky: 'https://bsky.app/intent/compose?text=' + texte + '%20' + url,
        partageThreads: 'https://www.threads.com/intent/post?text=' + texte + '%20' + url,
        partageReddit: 'https://www.reddit.com/submit?url=' + url + '&title=' + encodeURIComponent(TITRE_PARTAGE),
        partageWhatsapp: 'https://wa.me/?text=' + texte + '%20' + url,
        partageEmail: 'mailto:?subject=' + encodeURIComponent(TITRE_PARTAGE) + '&body=' + texte + '%20' + url
    };
    Object.keys(liens).forEach(function (id) {
        const lien = document.getElementById(id);
        if (lien) {
            lien.href = liens[id];
        }
    });
    // Le bouton « Autres applications… » n'apparaît que si l'appareil sait partager
    const partageNatifItem = document.getElementById('partageNatifItem');
    if (partageNatifItem) {
        partageNatifItem.hidden = !navigator.share;
    }
}

function ouvrirPartage() {
    const fenetre = document.getElementById('fenetrePartage');
    if (!fenetre) {
        return;
    }
    preparerLiensPartage();
    preparerAideFavoris();
    document.getElementById('messagePartage').textContent = '';
    if (typeof fenetre.showModal === 'function') {
        fenetre.showModal();
    } else {
        // Navigateurs sans <dialog> : affichage simple
        fenetre.setAttribute('open', '');
    }
}

function fermerPartage() {
    const fenetre = document.getElementById('fenetrePartage');
    if (!fenetre) {
        return;
    }
    if (typeof fenetre.close === 'function') {
        fenetre.close();
    } else {
        fenetre.removeAttribute('open');
    }
    // Le focus revient sur le bouton Partager
    const bouton = document.getElementById('shareButton');
    if (bouton) {
        bouton.focus();
    }
}

function partageNatif() {
    if (!navigator.share) {
        return;
    }
    navigator.share({
        title: TITRE_PARTAGE,
        text: TEXTE_PARTAGE,
        url: adressePartagee()
    }).catch(function () {
        // Partage annulé par l'utilisateur : rien à faire
    });
}

function afficherMessagePartage(message) {
    const zone = document.getElementById('messagePartage');
    if (zone) {
        zone.textContent = message;
    }
}

function copierLienPartage() {
    const adresse = adressePartagee();
    const succes = function () {
        afficherMessagePartage('Le lien a été copié dans le presse-papier.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(adresse).then(succes, function () {
            copierAvecZoneTexte(adresse) ? succes() : echecCopie(adresse);
        });
    } else if (copierAvecZoneTexte(adresse)) {
        succes();
    } else {
        echecCopie(adresse);
    }
}

// Méthode de secours pour les navigateurs sans API presse-papier
function copierAvecZoneTexte(adresse) {
    const zoneTexte = document.getElementById('zone-texte');
    if (!zoneTexte) {
        return false;
    }
    zoneTexte.value = adresse;
    zoneTexte.select();
    try {
        return document.execCommand('copy');
    } catch (erreur) {
        return false;
    }
}

function echecCopie(adresse) {
    afficherMessagePartage('La copie a échoué. Adresse à copier : ' + adresse);
}

// Fermeture avec la touche Échap : on remet aussi le focus sur le bouton Partager
const fenetrePartage = document.getElementById('fenetrePartage');
if (fenetrePartage) {
    fenetrePartage.addEventListener('cancel', function (evenement) {
        evenement.preventDefault();
        fermerPartage();
    });
    // Clic en dehors du contenu de la fenêtre (sur le fond) : fermeture
    fenetrePartage.addEventListener('click', function (evenement) {
        if (evenement.target === fenetrePartage) {
            fermerPartage();
        }
    });
}


// Bouton Haut de page

function topFunction() {
    // Durée de l'animation (en millisecondes)
    const duration = 200;

    // Position actuelle de défilement
    const startScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    // Respecte le réglage « réduire les animations » du système
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setScroll(position) {
        document.documentElement.scrollTop = document.body.scrollTop = position;
    }

    // Une fois en haut, place le focus sur le titre principal pour que
    // la navigation au clavier ou au lecteur d'écran reprenne en haut de page
    function focusTop() {
        const titre = document.querySelector('h1');
        if (titre) {
            if (!titre.hasAttribute('tabindex')) {
                titre.setAttribute('tabindex', '-1');
            }
            titre.focus({ preventScroll: true });
        }
    }

    if (reduceMotion || startScroll === 0 || !window.requestAnimationFrame) {
        setScroll(0);
        focusTop();
        return;
    }

    let startTime = null;

    function animateScroll(timestamp) {
        // Le temps de départ est pris sur la première image pour éviter un écart négatif
        if (startTime === null) {
            startTime = timestamp;
        }
        const progress = Math.min((timestamp - startTime) / duration, 1);

        setScroll(startScroll * (1 - progress));

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            setScroll(0);
            focusTop();
        }
    }

    requestAnimationFrame(animateScroll);
}


// Ouvre un accordéon <details> ciblé par une ancre (ex. lien d'évitement vers #contact)
// et place le focus sur son titre pour que la navigation reprenne à cet endroit.
function ouvrirAccordeonCible(id) {
    const cible = id && document.getElementById(id);
    if (!cible) {
        return;
    }
    const accordeon = cible.closest('details');
    if (accordeon) {
        accordeon.open = true;
        const titre = accordeon.querySelector('summary');
        if (titre) {
            // Après la navigation vers l'ancre, qui sinon replace le focus sur la page
            setTimeout(function () {
                titre.focus();
            }, 0);
        }
    }
}

document.querySelectorAll('a[href^="#"]').forEach(function (lien) {
    lien.addEventListener('click', function () {
        ouvrirAccordeonCible(lien.getAttribute('href').slice(1));
    });
});

// Si la page est ouverte directement avec une ancre (ex. index.html#contact)
ouvrirAccordeonCible(window.location.hash.slice(1));

// AccessConfig crée son bouton au chargement de la page : on lui ajoute une infobulle,
// utile quand il est affiché sous forme de pictogramme à côté de l'interrupteur.
window.addEventListener('load', function () {
    const boutonAccessConfig = document.getElementById('a42-ac-button');
    if (boutonAccessConfig && !boutonAccessConfig.title) {
        boutonAccessConfig.title = boutonAccessConfig.textContent.trim();
    }
});
