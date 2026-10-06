# Gas El Volcan - DSY1104 Evaluacion Parcial 2

El proyecto fue actualizado a React manteniendo el caso de Gas El Volcan y agregando un flujo de compra responsive para demostrar la experiencia completa desde el catalogo hasta la confirmacion del pedido.

## Funcionalidades para demostrar en la evaluacion
- Framework moderno: React.
- Componentes reutilizables con props y callbacks.
- Estado con `useState` y calculos con `useMemo`.
- Bootstrap 5 para diseño responsive.
- Navbar responsive para computador y celular.
- Catalogo de productos con busqueda y filtros por categoria.
- Agregar productos al carrito.
- Aumentar/disminuir cantidades y eliminar productos.
- Calculo automatico del total.
- Boton **Ir a pagar** desde el carrito.
- Checkout responsive con datos de entrega.
- Tres metodos de pago simulados: tarjeta, transferencia y contra entrega.
- Validacion del formulario de checkout.
- Pantalla de confirmacion del pedido.
- Inicio de sesion con validacion.
- Busqueda mediante modal.
- 10 pruebas unitarias con Jasmine y Karma.
- Reporte de cobertura con Karma Coverage.

## Flujo recomendado para presentar
1. Abrir la aplicacion con `npm run dev`.
2. Mostrar el menu responsive reduciendo el ancho de la ventana o usando las herramientas del navegador.
3. Entrar a **Productos** y probar una categoria y el buscador.
4. Agregar dos productos al carrito.
5. Abrir **Carrito**, cambiar cantidades y mostrar el total.
6. Presionar **Ir a pagar**.
7. Completar datos de entrega y seleccionar un metodo de pago.
8. Mostrar la validacion dejando un dato obligatorio vacio.
9. Completar el formulario y presionar **Finalizar pedido**.
10. Mostrar la pantalla de confirmacion.
11. Volver a la tienda y mostrar el login y la busqueda.

## Comandos
```bash
npm install
npm run dev
npm run test:evaluacion
npm run build
```

## Archivos importantes para explicar
- `src/main.jsx`: estado y logica principal de la aplicacion.
- `src/components/Navbar.jsx`: navbar responsive, props y estado del menu.
- `src/ProductCatalog.jsx`: estado de filtros y busqueda.
- `src/components/ProductCard.jsx`: props y evento para agregar productos.
- `src/components/Cart.jsx`: cantidades, eliminacion y total.
- `src/components/Checkout.jsx`: formulario responsive, metodos de pago, validacion y confirmacion.
- `src/components/SearchModal.jsx`: busqueda de productos.
- `src/Login.jsx`: validacion de acceso.
- `src/tests/components.spec.jsx`: 10 pruebas unitarias.
- `karma.conf.cjs`: configuracion del entorno Jasmine/Karma.
- `docs/cobertura-testing.md`: documentacion de cobertura.

## Configuracion de testing
- Vite 5 + `@vitejs/plugin-react`.
- Karma utiliza los frameworks `vite` y `jasmine`.
- Las pruebas se ejecutan con ChromeHeadless mediante `npm run test:evaluacion`.
- El entorno de pruebas usa `React.act` para evitar la advertencia de `ReactDOMTestUtils.act`.
