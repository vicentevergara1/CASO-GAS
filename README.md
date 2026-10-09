# Gas El Volcán – Tienda online (Frontend)

Proyecto de la asignatura **DSY1104 – Desarrollo Fullstack II** (Evaluación Parcial 2).
Tienda online para la distribuidora de gas *Gas El Volcán*, migrada de HTML/CSS/JS a **React**, con diseño responsivo en **Bootstrap 5**, CRUD local de productos y pruebas unitarias con **Jasmine + Karma**.

## Integrantes

| Nombre | GitHub |
|---|---|
| Vicente Vergara | [@vicentevergara1](https://github.com/vicentevergara1) |
| _(agregar integrante)_ | _(usuario)_ |
| _(agregar integrante)_ | _(usuario)_ |

## Enlaces

- Repositorio: https://github.com/vicentevergara1/CASO-GAS
- Demo desplegada: _(agregar link si se publica)_

## Tecnologías

- [React 18](https://react.dev/) (componentes, props, `useState`, `useMemo`)
- [Vite 5](https://vitejs.dev/) como bundler y servidor de desarrollo
- [Bootstrap 5.3](https://getbootstrap.com/) para el diseño responsivo
- [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) + Karma Coverage para testing
- Chrome Headless para ejecutar las pruebas

## Funcionalidades

- Navbar responsive (menú colapsable en móvil).
- Catálogo de productos con filtro por categoría y búsqueda de texto.
- Buscador mediante modal.
- Carrito de compras: agregar, aumentar/disminuir cantidad, eliminar y total automático.
- Checkout responsive con datos de entrega, validación del formulario y tres métodos de pago simulados (tarjeta, transferencia, contra entrega).
- Pantalla de confirmación del pedido.
- Formulario de inicio de sesión con validación de correo y contraseña.
- Administración de productos integrada en React, con creación, lectura, edición y eliminación.
- Selección de fotografías existentes o carga de fotos JPG, PNG y WEBP desde el equipo, con vista previa y optimización.
- Persistencia del catálogo y las cantidades del carrito mediante `localStorage`.
- Pantalla de pago fallido simulado, con opción de volver a intentar.

La administración y el acceso de cliente son demostraciones del frontend, sin autenticación real ni backend. Los datos almacenados con `localStorage`, incluidas las fotografías subidas, permanecen en el navegador y dispositivo usados; no se comparten con otros visitantes de GitHub Pages. La pasarela de pago también está simulada.

## Instalación y ejecución

Requisitos: Node.js 18 o superior y Google Chrome (para los tests).

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test:evaluacion
```

Si Karma no encuentra Chrome, define la variable `CHROME_BIN` con la ruta del ejecutable.

## Estructura del proyecto

```
CASO-GAS/
├── index.html
├── vite.config.js
├── karma.conf.cjs
├── assets/images/
├── docs/
└── src/
    ├── main.jsx
    ├── ProductCatalog.jsx
    ├── Login.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── SearchModal.jsx
    │   └── Admin.jsx
    ├── data/products.js
    └── tests/components.spec.jsx
```

## Gestión de props y estado

- `App` (`main.jsx`) mantiene el estado compartido: productos, carrito, visibilidad de modales y texto de búsqueda. Lo entrega a los hijos mediante **props** y recibe eventos mediante **callbacks** (`onAdd`, `onIncrease`, `onDecrease`, `onRemove`, `onCheckout`, `onClose`).
- `ProductCatalog`, `Checkout`, `Login` y `Navbar` manejan **estado local** (filtros, formulario, errores, menú abierto).
- El conteo del carrito y el total se calculan con `useMemo` / `reduce`.

## Pruebas unitarias

Las 23 pruebas están definidas en `src/tests/components.spec.jsx`:

1. Navbar renderiza el nombre de la tienda.
2. Navbar recibe `cartCount` por props.
3. ProductCard muestra los datos recibidos por props.
4. ProductCard ejecuta el callback `onAdd`.
5. ProductCatalog renderiza todo el catálogo.
6. ProductCatalog cambia el estado al seleccionar una categoría.
7. Cart calcula el total y muestra "Ir a pagar".
8. Checkout muestra los datos de entrega y el resumen.
9. SearchModal muestra coincidencias.
10. SearchModal informa cuando no hay resultados.
11. SearchModal presenta la imagen, el precio y controles.
12. SearchModal agrega al carrito la cantidad elegida.
13. SearchModal filtra por categoría.
14. El catálogo recupera los productos iniciales.
15. CRUD crea productos nuevos.
16. CRUD actualiza precios sin mutar el original.
17. CRUD elimina productos.
18. CRUD rechaza precios no válidos.
19. Persistencia guarda y recupera cambios en los productos.
20. Persistencia guarda y recupera las cantidades del carrito.
21. El carrito ignora productos eliminados.
22. Administración permite seleccionar un producto para editar.
23. Checkout contempla el flujo de pago fallido simulado.

Los callbacks (`onAdd`, `onClose`, `onFinish`, etc.) se reemplazan por funciones *mock* para probar cada componente de forma aislada. Al ejecutar `npm run test:evaluacion`, Karma genera la cobertura en `coverage/html/`. Los reportes incluidos en ZIP anteriores son históricos y no prueban los cambios actuales.

## Documentación

- ERS (Especificación de Requisitos del Software): `docs/`
- Cobertura de testing: `docs/cobertura-testing.md`

## Estado del proyecto

Implementado en esta versión: CRUD con almacenamiento local, vista de administración React, persistencia de carrito y catálogo, y vista demostrativa de pago fallido.

Pendiente de comprobar: resultado de las pruebas con Karma, compilación de producción y publicación real en GitHub Pages. No hay autenticación administrativa, backend ni pasarela de pagos real. Otras vistas mencionadas como propuesta por el Anexo 1, como ofertas y detalle de producto, no son pantallas independientes en React. Confirma su obligatoriedad con el docente.
