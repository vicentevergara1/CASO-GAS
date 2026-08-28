if (localStorage.getItem('usuarioAutenticado') !== 'true') {
    window.location.href = 'login.html';
}
document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('usuarioAutenticado');
    window.location.href = 'login.html';
});
const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('prod-name').value;
    const precio = parseFloat(document.getElementById('prod-price').value);

    let productos = JSON.parse(localStorage.getItem('productosStore')) || [];
    productos.push({ id: Date.now(), nombre, precio });

    localStorage.setItem('productosStore', JSON.stringify(productos));
    productForm.reset();
    renderizarAdminProductos();
});
function renderizarAdminProductos() {
    const list = document.getElementById('admin-product-list');
    list.innerHTML = '';
    let productos = JSON.parse(localStorage.getItem('productosStore')) || [];

    productos.forEach(p => {
        list.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>Precio: $${p.precio}</p>
                <button onclick="eliminarProducto(${p.id})" style="background-color: #e74c3c;">Eliminar</button>
            </div>
        `;
    });
}
function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem('productosStore')) || [];
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem('productosStore', JSON.stringify(productos));
    renderizarAdminProductos();
}
renderizarAdminProductos();