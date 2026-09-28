// interactividad.js

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // BOTÓN "VOLVER ARRIBA"
    // ============================================
    const btnBackToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnBackToTop.classList.add('back-to-top--visible');
        } else {
            btnBackToTop.classList.remove('back-to-top--visible');
        }
    });

    btnBackToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // HEADER QUE CAMBIA AL HACER SCROLL
    // ============================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // ============================================
    // ANIMACIONES AL HACER SCROLL (REVEAL)
    // ============================================
    const elementosAAnimar = document.querySelectorAll(
        '.beneficios__grid, .productos__encabezado, .producto-card, ' +
        '.educativa__imagen, .educativa__contenido, .ritual__encabezado, ' +
        '.ritual__formatos, .paso, .testimonios__encabezado, .testimonio, ' +
        '.instagram__encabezado, .instagram__post, .cta-final__contenido'
    );

    elementosAAnimar.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elementosAAnimar.forEach(el => observer.observe(el));

    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const href = enlace.getAttribute('href');

            // Ignorar el enlace "#" solo (sin destino)
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const destino = document.querySelector(href);
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});