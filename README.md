# Gas El Volcán – Tienda online (Frontend)

Proyecto de la asignatura **DSY1104 – Desarrollo Fullstack II** (Evaluación Parcial 2).
Tienda online para la distribuidora de gas *Gas El Volcán*, migrada de HTML/CSS/JS a **React**, con diseño responsivo en **Bootstrap 5**, CRUD local de productos y pruebas unitarias con **Jasmine + Karma**.

## Integrantes

| Nombre | GitHub |
|---|---|
| Vicente Vergara | [@vicentevergara1](https://github.com/vicentevergara1) |
| Juan Parra | [@juanalonsoparraverdejo](https://github.com/juanalonsoparraverdejo) |
| Benjamín Perez |  [@Benja-ignacio](https://github.com/Benja-ignacio) |

## Enlaces

- Repositorio: https://github.com/vicentevergara1/CASO-GAS
- Sitio desplegado: _(agregar link si se publica)_

## Tecnologías

- [React 18](https://react.dev/) (componentes, props, `useState`, `useEffect`, `useMemo` y hooks propios)
- [Vite 5](https://vitejs.dev/) como bundler y servidor de desarrollo
- [Bootstrap 5.3](https://getbootstrap.com/) para el diseño responsivo
- [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) + Karma Coverage para testing
- Chrome Headless para ejecutar las pruebas

## Funcionalidades

- Navbar responsive (menú colapsable en móvil).
- Rutas separadas para la tienda pública (`#/`) y el panel administrativo (`#/admin`).
- Catálogo de productos con filtro por categoría y búsqueda de texto.
- Buscador mediante modal.
- Carrito de compras: agregar, aumentar/disminuir cantidad, eliminar y total automático.
- Checkout responsive con datos de entrega, validación del formulario y tres métodos de pago (tarjeta, transferencia, contra entrega).
- Pantalla de confirmación del pedido.
- Formulario de inicio de sesión y registro con validación de correo, contraseña y confirmación.
- Administración de productos en una vista independiente, con creación, lectura, edición y eliminación.
- Selección de fotografías existentes o carga de fotos JPG, PNG y WEBP desde el equipo, con vista previa y optimización.
- Persistencia del catálogo y las cantidades del carrito mediante `localStorage`.
- Estado de pago rechazado con opción de volver a intentar.

El backend y la autenticación están pendientes de implementación. Por ahora el acceso de administración no aparece en la tienda y se entra directamente por `#/admin`; esa ruta **todavía no está protegida**, por lo que no debe considerarse una medida de seguridad. Los datos almacenados con `localStorage`, incluidas las fotografías subidas, permanecen en el navegador y dispositivo usados. La pasarela de pago aún no está integrada.

## Rutas

| Ruta | Contenido |
|---|---|
| `#/` | Tienda pública: portada, catálogo, servicios, información, cuenta y contacto. |
| `#/admin` | Panel de administración con CRUD del catálogo (acceso directo por URL). |
| `#productos`, `#servicios`, `#nosotros`, `#faq`, `#cuenta`, `#contacto` | Secciones de la tienda pública. |

Se usa un router mínimo basado en hash para que la tienda funcione al recargar en GitHub Pages sin reglas de servidor. La separación por rutas y carpetas es organizativa; no constituye una medida de seguridad. El acceso a `#/admin` deberá protegerse con autenticación cuando se implemente el backend.

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
├── public/assets/images/
├── docs/
└── src/
    ├── main.jsx
    ├── app/
    │   ├── App.jsx
    │   └── router.jsx
    ├── features/
    │   ├── store/
    │   │   ├── StorePage.jsx
    │   │   ├── store.css
    │   │   └── components/
    │   ├── cart/
    │   ├── checkout/
    │   ├── search/
    │   ├── auth/
    │   └── admin/
    │       ├── AdminPage.jsx
    │       ├── admin.css
    │       └── components/
    ├── shared/
    │   ├── components/
    │   ├── hooks/
    │   └── styles/
    ├── services/
    ├── data/products.js
    └── tests/components.spec.jsx
```

Las carpetas `pages/` y `assets/js/` corresponden a la versión HTML anterior y no forman parte del flujo Vite actual. `src/output.css` se conserva porque esas páginas antiguas lo referencian. La aplicación React usa las imágenes de `public/assets/images/` mediante `import.meta.env.BASE_URL`.

## Gestión de props y estado

- `App` (`src/app/App.jsx`) mantiene el estado compartido del catálogo y el carrito, aplica la persistencia y resuelve la ruta activa. La lógica de las vistas queda en `StorePage` y `AdminPage`.
- `router.jsx` implementa las rutas hash de la tienda y la administración.
- `StorePage` coordina la composición de la tienda y el estado de los modales de carrito, búsqueda y checkout.
- `ProductCatalog`, `Checkout`, `LoginSection`, `Faq`, `StoreNavbar` y la administración manejan **estado local** (filtros, formularios, errores, menú, edición).
- El conteo del carrito y el total se calculan con `useMemo` / `reduce`.
- Los botones y controles comparten los estilos de `shared/styles/base.css`; cada área conserva sus propios estilos en `store.css`, `cart.css`, `checkout.css`, `search.css` y `admin.css`.

## Pruebas unitarias

Las 30 pruebas están definidas en `src/tests/components.spec.jsx`:

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
23. Checkout valida los datos de entrega antes de confirmar.
24. La ruta de una imagen existente sigue funcionando.
25. Las fotografías subidas se muestran directamente en el catálogo.
26. La carga de fotografías rechaza archivos que no son imágenes.
27. Una fotografía subida permanece en los datos guardados.
28. Administración permite elegir archivo y muestra la foto subida al editar.
29. El registro valida que las contraseñas coincidan.
30. El registro exitoso muestra confirmación.

Los callbacks (`onAdd`, `onClose`, `onFinish`, etc.) se reemplazan por funciones *mock* para probar cada componente de forma aislada. Al ejecutar `npm run test:evaluacion`, Karma genera la cobertura en `coverage/html/`. Los reportes incluidos en ZIP anteriores son históricos y no prueban los cambios actuales.

## Documentación

- ERS (Especificación de Requisitos del Software): `docs/`
- Cobertura de testing: `docs/cobertura-testing.md`
- Notas de implementación del frontend: `docs/implementacion-frontend.md`

## Estado del proyecto

Implementado en esta versión: rutas separadas para tienda y administración, CRUD con almacenamiento local, estilos y componentes por área, persistencia de carrito y catálogo, accesibilidad básica de diálogos y estado de pago rechazado con opción de reintentar.

Pendiente de comprobar: publicación real en GitHub Pages. Todavía no hay autenticación administrativa, backend ni pasarela de pagos integrada. Otras vistas mencionadas como propuesta por el Anexo 1, como ofertas y detalle de producto, no son pantallas independientes en React. Confirma su obligatoriedad con el docente.
