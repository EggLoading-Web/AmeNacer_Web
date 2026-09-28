// faq.js
document.addEventListener('DOMContentLoaded', () => {

    const preguntas = document.querySelectorAll('.faq__pregunta');

    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const item = pregunta.parentElement;
            const estaAbierto = item.classList.contains('faq__item--abierto');

            // Cerrar todas
            document.querySelectorAll('.faq__item').forEach(i => {
                i.classList.remove('faq__item--abierto');
                const btn = i.querySelector('.faq__pregunta');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Abrir la clickeada (si no estaba ya abierta)
            if (!estaAbierto) {
                item.classList.add('faq__item--abierto');
                pregunta.setAttribute('aria-expanded', 'true');
            }
        });
    });

});