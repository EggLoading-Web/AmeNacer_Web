// contacto.js
document.addEventListener('DOMContentLoaded', () => {

    const WHATSAPP_NUMERO = '5493471501214'; // ← Cambiar por el real

    const form = document.getElementById('form-contacto');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // Armar el mensaje para WhatsApp
            let texto = `¡Hola AMÊ NACÊR! 🌿\n\n`;
            texto += `*Nombre:* ${nombre}\n`;
            texto += `*Teléfono:* ${telefono}\n`;
            if (email) texto += `*Email:* ${email}\n`;
            texto += `*Asunto:* ${asunto}\n\n`;
            texto += `*Mensaje:*\n${mensaje}`;

            const textoCodificado = encodeURIComponent(texto);
            const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${textoCodificado}`;

            window.open(url, '_blank');
        });
    }

});