# Presentación y demostración de código - Gas El Volcán

## Recorrido práctico sugerido

1. Mostrar la página principal y el catálogo responsivo. Reducir el ancho de Chrome y señalar las clases de Bootstrap en `src/ProductCatalog.jsx`.
2. Usar el buscador modal, escoger tres unidades y agregar al carrito. Abrir `src/components/SearchModal.jsx` y explicar el estado `quantity` y el callback `onAdd`.
3. Abrir `src/main.jsx` y explicar el estado `cart`, el cálculo del total y la persistencia mediante `useEffect`.
4. Entrar a Administración, crear un producto, editar su precio y eliminar uno de prueba. Mostrar `src/components/Admin.jsx` y las funciones `createProduct`, `readProducts`, `updateProduct` y `deleteProduct` en `src/data/products.js`.
5. Recargar la página y demostrar que el catálogo y el carrito siguen presentes por `localStorage`. Aclarar que estos datos están guardados solamente en el navegador local.
6. Ir al checkout, mostrar un error de validación, luego completar los datos y elegir pago contra entrega para probar el botón Simular pago fallido. Reintentar y mostrar la confirmación.
7. Abrir `src/tests/components.spec.jsx` para explicar `describe`, `it`, `expect`, mocks y los casos de prueba.
8. Ejecutar `npm run test:evaluacion` y enseñar el resultado real. No usar porcentajes de un reporte antiguo.

## Preguntas cortas de defensa

**¿Qué es React?** Es una biblioteca de JavaScript que permite construir la interfaz a partir de componentes reutilizables.

**¿Qué son las props?** Son datos y funciones que recibe un componente desde su padre, por ejemplo los productos y la función `onAdd`.

**¿Qué es useState?** Es un hook que mantiene valores cambiantes como el carrito, el filtro o el formulario de administración.

**¿Por qué el estado está en App?** El catálogo, la búsqueda, la administración y el carrito necesitan usar y actualizar la misma lista de productos.

**¿Dónde se implementa el CRUD?** En `src/data/products.js` se crean, consultan, editan y eliminan productos. `Admin.jsx` permite ejecutar esas operaciones desde la pantalla.

**¿Dónde se guarda la información?** En el `localStorage` del navegador. Es persistencia local de prueba, no un backend ni una base de datos compartida.

**¿Cómo se verifica el código?** Jasmine describe las pruebas y sus expectativas; Karma las ejecuta en ChromeHeadless y genera un reporte de cobertura.

**¿El pago es real?** No. El checkout y el fallo de pago son demostraciones del flujo de la interfaz y no realizan cargos reales.

**¿La administración tiene seguridad?** No, es una demostración frontend; para producción se requiere autenticación y autorización en el servidor.

## Comprobaciones antes de grabar

- Ejecutar `npm install`, `npm run dev` y `npm run build`.
- Ejecutar `npm run test:evaluacion` y verificar cuántas pruebas pasan.
- Confirmar que las imágenes carguen y que el diseño responda en pantalla móvil.
- Revisar la publicación real en GitHub Pages, si la entrega exige ese enlace.
- Actualizar el ERS para que corresponda a las funciones implementadas.
