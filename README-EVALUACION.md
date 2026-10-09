# Gas El Volcán — proyecto de evaluación

Aplicación frontend para una distribuidora de gas, construida con React, Vite y Bootstrap 5. Incluye catálogo, filtros, ofertas, detalle de producto, carrito persistente, checkout de demostración, registro local y panel de administración.

## Requisitos
- Node.js 20 o superior recomendado.
- npm.
- Google Chrome para ejecutar Karma con ChromeHeadless localmente.

## Ejecutar en local
```bash
npm ci
npm run dev
```

## Validar antes de entregar
```bash
npm run test:evaluacion
npm run build
```

## Funcionalidades
- Componentes React reutilizables, props, callbacks, `useState`, `useEffect` y `useMemo`.
- Diseño responsive mediante Bootstrap 5 y CSS media queries.
- Catálogo con búsqueda y filtro por categoría.
- Sección de ofertas/destacados y modal de detalle de producto.
- Carrito con agregar, incrementar, disminuir, eliminar y cálculo de total.
- Persistencia de carrito, catálogo, usuarios de demostración y pedidos mediante `localStorage`.
- Checkout con validaciones y métodos de pago simulados.
- Pago rechazado simulado: en el campo de tarjeta, usar un número de prueba que termine en `0000`, completando los demás campos obligatorios.
- Panel de administración: crear, listar, editar y eliminar productos; consultar usuarios/pedidos guardados y exportar pedidos a JSON.
- Registro de usuario para demostración.
- 15 pruebas unitarias con Jasmine/Karma, incluyendo spies, CRUD, persistencia y validación condicional.
- Workflow de GitHub Actions para ejecutar pruebas, compilar y publicar en GitHub Pages.

## Flujo recomendado para la defensa
1. Mostrar la página en escritorio y reducir el ancho para demostrar responsive.
2. Filtrar productos por categoría y buscar por nombre.
3. Abrir detalle, agregar producto y modificar cantidades en el carrito.
4. Recargar para demostrar persistencia del carrito.
5. Ir al checkout, dejar un campo vacío para demostrar validación.
6. Mostrar pago rechazado con una tarjeta de prueba terminada en `0000` y volver a intentar.
7. Finalizar una compra de demostración y mostrarla en Administración.
8. Crear, editar y eliminar un producto desde Administración.
9. Registrar un usuario y mostrar el registro en el panel.
10. Ejecutar `npm run test:evaluacion` y `npm run build`.

## Archivos clave
- `src/main.jsx`: componente raíz, estado global del carrito/productos/pedidos y composición de vistas.
- `src/data/products.js`: datos iniciales y funciones CRUD del catálogo.
- `src/data/persistence.js`: helpers de lectura/escritura en `localStorage`.
- `src/ProductCatalog.jsx`: búsqueda y filtros.
- `src/components/ProductCard.jsx`: tarjeta de producto, props y callbacks.
- `src/components/Cart.jsx`: cantidades, eliminación y total.
- `src/components/Checkout.jsx`: validación, flujo de pago simulado y confirmación/rechazo.
- `src/components/Admin.jsx`: panel CRUD.
- `src/components/Register.jsx`: registro de demostración.
- `src/components/ProductDetail.jsx`: detalle del producto.
- `src/tests/components.spec.jsx`: pruebas unitarias.
- `karma.conf.cjs`: configuración de Jasmine/Karma.
- `vite.config.js`: configuración de Vite y base de GitHub Pages.

## Límites importantes
`localStorage` guarda información únicamente en el navegador y dispositivo actual; no sincroniza datos entre usuarios. No hay backend, autenticación segura ni procesamiento de pagos reales. No usar datos sensibles reales durante la presentación.


## Guía de defensa oral
Consulta `docs/GUIA-DEFENSA.md`, que contiene preguntas probables y respuestas sugeridas sobre React, props, estado, Bootstrap, CRUD, persistencia, pruebas, cobertura y despliegue.
