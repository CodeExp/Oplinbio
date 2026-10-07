// Pour le Bouton Darkmode Lightmode

const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

// L'interrupteur n'est pas présent sur toutes les pages (il est commenté sur l'accueil)
if (themeSwitch) {
    themeSwitch.addEventListener('change', function () {
        if (themeSwitch.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
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


// Javascript pour la fonction de copier coller ou partager le lien du site.
function shareOrCopyLink() {
    const lien = document.getElementById('lien').href;
    const zoneTexte = document.getElementById('zone-texte');

    // Vérifier si l'API Web Share est prise en charge par le navigateur
    if (navigator.share) {
        // Partager le lien via l'API Web Share
        navigator.share({
                title: 'Linktree Prénom Nom',
                text: 'Site pour accéder aux différents réseaux de Prénom Nom',
                url: lien
            })
            .then(() => console.log('Lien partagé avec succès !'))
            .catch((error) => {
                console.error('Erreur lors du partage :', error);
                // En cas d'erreur, copier le lien dans le presse-papier
                copyLinkToClipboard(lien);
            });
    } else {
        // Si l'API Web Share n'est pas prise en charge, copier le lien directement
        copyLinkToClipboard(lien);
    }
}

function copyLinkToClipboard(link) {
    const zoneTexte = document.getElementById('zone-texte');

    // Placer le lien dans la zone de texte
    zoneTexte.value = link;
    zoneTexte.select();

    try {
        // Copier le texte sélectionné
        const resultat = document.execCommand('copy');
        if (resultat) {
            alert("Le lien a été copié avec succès !");
        } else {
            alert("La copie du lien a échoué. Veuillez le copier manuellement.");
        }
    } catch (err) {
        alert("Une erreur est survenue lors de la copie du lien : " + err);
    }
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
