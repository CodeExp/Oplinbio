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

// pour ajouter le site aux favoris

function favoris() {
    if (navigator.appName != 'Microsoft Internet Explorer') {
        window.alert("Pour ajouter le site aux favoris, veuillez passer par votre navigateur");
    } else {
        window.external.AddFavorite("https://www.example.fr", "example.com");
    }
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
