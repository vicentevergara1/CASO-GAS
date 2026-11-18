# Implementación del frontend

Este documento resume la organización actual de la aplicación React de Gas El Volcán y sus límites funcionales.

## Rutas

| Ruta | Vista |
|---|---|
| `#/` | Tienda pública |
| `#/admin` | Panel administrativo (acceso directo por URL) |
| `#productos`, `#servicios`, `#nosotros`, `#faq`, `#cuenta`, `#contacto` | Secciones de la tienda |

El router está en `src/app/router.jsx` y usa el hash de la URL. Se eligió este enfoque para que la tienda funcione al recargar en GitHub Pages sin configurar reglas de servidor.

## Organización

```
src/
├── app/                 # Composición de la aplicación y router
├── features/
│   ├── store/           # Portada, catálogo y secciones informativas
│   ├── cart/            # Carrito lateral
│   ├── checkout/        # Checkout y estados de pago
│   ├── search/          # Buscador modal
│   ├── auth/            # Formulario de acceso y registro
│   └── admin/           # Panel, formulario y listado administrativo
├── shared/              # Iconos SVG, hook de diálogos y estilos base
├── services/            # Utilidades de formato y normalización de texto
├── data/                # Catálogo inicial y persistencia local
└── tests/               # Pruebas unitarias
```

`App` conserva el estado compartido del catálogo y el carrito. `StorePage` compone la tienda y controla sus modales; `AdminPage` contiene la administración y no se mezcla con la presentación pública.

## Interfaz y accesibilidad

- Los botones y controles comparten estilos en `src/shared/styles/base.css`: primario, secundario, peligro, enlace, deshabilitado y foco visible.
- Los iconos son SVG locales de `shared/components/Icon.jsx`; no se agregaron dependencias de iconos.
- El menú móvil se cierra al navegar y la barra de navegación colapsa en tablet y móvil.
- Carrito, búsqueda y checkout usan un hook común (`useDialog`) con cierre con Escape, bloqueo del scroll de fondo, foco inicial y contención del foco.
- Las preguntas frecuentes se implementaron como acordeón real con `aria-expanded` y `aria-controls`.
- Los métodos de pago disponibles son tarjeta de débito o crédito, transferencia bancaria y pago contra entrega.
- Se revisaron anchos de 360 px, 768 px y 1280 px sin desbordamiento horizontal.

## Persistencia y límites

- El catálogo y el carrito se guardan en `localStorage` con las claves existentes `gas-el-volcan-products-v2` y `gas-el-volcan-cart-v2`.
- Las fotografías subidas se convierten a `data:` y también quedan en el almacenamiento local del navegador.
- El backend, la autenticación, los usuarios, los permisos y el procesamiento de pagos están pendientes de implementación.
- `#/admin` se abre directamente por URL y todavía no está protegida. La separación de carpetas y rutas es organizativa y **no protege los datos**.
- El formulario de acceso valida datos en el cliente y aún no crea sesiones ni guarda credenciales.
- Los datos locales no se comparten entre navegadores, dispositivos ni visitantes del sitio.

## Páginas heredadas

`pages/` y `assets/js/` pertenecen a la versión HTML anterior y no están conectados al flujo Vite actual. `src/output.css` se mantiene porque esas páginas lo enlazan. La aplicación React usa las imágenes de `public/assets/images/` mediante `import.meta.env.BASE_URL`, por lo que se conserva la configuración de Vite y las rutas de recursos.

## Verificaciones

- `npm run build`: compilación de producción correcta.
- `npm run test:evaluacion`: 30 pruebas unitarias aprobadas.
- Revisión visual con Chrome Headless en 360 px, 768 px y 1280 px para tienda, administración, carrito, búsqueda, checkout y menú móvil.
