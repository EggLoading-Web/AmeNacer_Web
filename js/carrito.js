// carrito.js
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// ⚠️ CAMBIAR POR EL NÚMERO REAL DE WHATSAPP DE LA CLIENTA
// Formato: 54 9 [código de área sin 0] [número sin 15]
const WHATSAPP_NUMERO = '5493471501214';

// ============================================
// UTILIDADES
// ============================================
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    renderizarCarrito();
}

function formatearPrecio(valor) {
    return '$' + valor.toLocaleString('es-AR');
}

// ============================================
// CONTADOR DEL HEADER
// ============================================
function actualizarContador() {
    const contador = document.getElementById('carrito-contador');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

// ============================================
// AGREGAR AL CARRITO
// ============================================
function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
        existente.cantidad += producto.cantidad || 1;
    } else {
        carrito.push({ ...producto, cantidad: producto.cantidad || 1 });
    }
    guardarCarrito();
}

// ============================================
// RENDERIZAR CARRITO EN EL DRAWER
// ============================================
function renderizarCarrito() {
    const contenedor = document.getElementById('carrito-contenido');
    const footer = document.getElementById('carrito-footer');
    const totalEl = document.getElementById('carrito-total');

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.<br>¡Empezá a sumar bienestar!</p>';
        if (footer) footer.classList.add('carrito-drawer__footer--oculto');
        return;
    }

    contenedor.innerHTML = carrito.map(item => `
        <div class="carrito-item" data-id="${item.id}">
            <img src="${item.imagen || 'img/productos/' + item.id + '-1.jpg'}" alt="${item.nombre}" class="carrito-item__imagen" onerror="this.style.display='none'">
            <div class="carrito-item__info">
                <h4 class="carrito-item__nombre">${item.nombre}</h4>
                <p class="carrito-item__precio-unitario">${formatearPrecio(item.precio)} c/u</p>
            </div>
            <div class="carrito-item__acciones">
                <span class="carrito-item__precio">${formatearPrecio(item.precio * item.cantidad)}</span>
                <div class="carrito-item__cantidad">
                    <button data-accion="restar" data-id="${item.id}">−</button>
                    <span>${item.cantidad}</span>
                    <button data-accion="sumar" data-id="${item.id}">+</button>
                </div>
                <button class="carrito-item__eliminar" data-accion="eliminar" data-id="${item.id}">Eliminar</button>
            </div>
        </div>
    `).join('');

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    if (totalEl) totalEl.textContent = formatearPrecio(total);
    if (footer) footer.classList.remove('carrito-drawer__footer--oculto');
}

// ============================================
// ENVIAR PEDIDO POR WHATSAPP
// ============================================
function enviarPedidoPorWhatsApp() {
    if (carrito.length === 0) return;

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const detalleProductos = carrito.map(item =>
        `• ${item.nombre} x${item.cantidad} — ${formatearPrecio(item.precio * item.cantidad)}`
    ).join('\n');

    const mensaje =
`¡Hola AMÊ NACÊR! 🌿

Quiero hacer el siguiente pedido:

${detalleProductos}

*Total: ${formatearPrecio(total)}*

Mis datos para coordinar el pago y envío:
• Nombre:
• Dirección:
• Localidad:
• Código Postal:
• Forma de pago preferida (transferencia / Mercado Pago / efectivo):

¡Gracias!`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}

// ============================================
// ABRIR / CERRAR DRAWER
// ============================================
function abrirCarrito() {
    const drawer = document.getElementById('carrito-drawer');
    const overlay = document.getElementById('carrito-overlay');
    if (drawer) drawer.classList.add('carrito-drawer--activo');
    if (overlay) overlay.classList.add('carrito-overlay--activo');
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    const drawer = document.getElementById('carrito-drawer');
    const overlay = document.getElementById('carrito-overlay');
    if (drawer) drawer.classList.remove('carrito-drawer--activo');
    if (overlay) overlay.classList.remove('carrito-overlay--activo');
    document.body.style.overflow = '';
}

// ============================================
// EVENTOS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    renderizarCarrito();

    const btnCarrito = document.getElementById('carrito-btn');
    if (btnCarrito) btnCarrito.addEventListener('click', abrirCarrito);

    const btnCerrar = document.getElementById('carrito-cerrar');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarCarrito);

    const overlay = document.getElementById('carrito-overlay');
    if (overlay) overlay.addEventListener('click', cerrarCarrito);

    // Botón "Finalizar compra por WhatsApp"
    const btnCheckout = document.getElementById('carrito-checkout');
    if (btnCheckout) btnCheckout.addEventListener('click', enviarPedidoPorWhatsApp);
});

// Escuchar clics en botones "Lo quiero" y en acciones del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('producto-card__btn')) {
        e.preventDefault();
        const boton = e.target;
       agregarAlCarrito({
    id: boton.dataset.id,
    nombre: boton.dataset.nombre,
    precio: parseFloat(boton.dataset.precio),
    imagen: boton.dataset.imagen
});

        const textoOriginal = boton.textContent;
        boton.textContent = '¡Agregado!';
        boton.disabled = true;
        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.disabled = false;
        }, 1500);

        setTimeout(abrirCarrito, 400);
    }

    const accion = e.target.dataset.accion;
    const id = e.target.dataset.id;

    if (accion && id) {
        const item = carrito.find(i => i.id === id);
        if (!item) return;

        if (accion === 'sumar') {
            item.cantidad++;
        } else if (accion === 'restar') {
            item.cantidad--;
            if (item.cantidad <= 0) {
                carrito = carrito.filter(i => i.id !== id);
            }
        } else if (accion === 'eliminar') {
            carrito = carrito.filter(i => i.id !== id);
        }
        guardarCarrito();
    }
});