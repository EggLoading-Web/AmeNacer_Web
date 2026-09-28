// tienda.js
document.addEventListener('DOMContentLoaded', () => {

    const filtros = document.querySelectorAll('.filtro');
    const productos = document.querySelectorAll('#grid-productos .producto-card');
    const mensajeVacio = document.getElementById('tienda-vacia');
    const proximamente = document.getElementById('proximamente');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => f.classList.remove('filtro--activo'));
            filtro.classList.add('filtro--activo');

            const categoria = filtro.dataset.categoria;
            let visibles = 0;

            // Ocultar el mensaje de "Próximamente" por defecto
            if (proximamente) proximamente.style.display = 'none';

            productos.forEach(producto => {
                const categoriasProducto = producto.dataset.categorias.split(' ');

                if (categoria === 'todos' || categoriasProducto.includes(categoria)) {
                    producto.style.display = '';
                    visibles++;
                } else {
                    producto.style.display = 'none';
                }
            });

            // Categorías que muestran "Próximamente"
            const categoriasProximamente = ['vestimenta', 'limpieza', 'velas'];

            if (categoriasProximamente.includes(categoria)) {
                if (proximamente) proximamente.style.display = 'block';
                if (mensajeVacio) mensajeVacio.classList.remove('tienda-vacia--visible');
                return;
            }

            // Si no hay productos visibles, mostrar mensaje de vacío
            if (visibles === 0) {
                mensajeVacio.classList.add('tienda-vacia--visible');
            } else {
                mensajeVacio.classList.remove('tienda-vacia--visible');
            }
        });
    });

});