# Plan de pruebas — Gas El Volcán

## Herramientas
- Jasmine: framework de pruebas y expectativas.
- Karma: ejecuta las pruebas en un navegador.
- ChromeHeadless: Chrome sin interfaz gráfica.
- Karma Coverage: genera reporte de cobertura de código.
- React `act`: asegura que las actualizaciones de estado se procesen antes de comprobar el DOM.

## Casos cubiertos
1. Navbar muestra el nombre de la tienda.
2. Navbar recibe el contador por props.
3. ProductCard muestra datos del producto.
4. ProductCard ejecuta un spy al agregar.
5. ProductCatalog renderiza todos los productos.
6. ProductCatalog filtra por categoría.
7. Cart calcula el total.
8. Cart ejecuta un spy al eliminar.
9. SearchModal muestra coincidencias.
10. SearchModal informa cuando no hay coincidencias.
11. Checkout muestra el resumen y los datos de entrega.
12. Checkout presenta un error condicional con formulario incompleto.
13. CRUD crea, consulta, actualiza y elimina productos.
14. CRUD rechaza datos obligatorios inválidos.
15. Helpers de persistencia guardan y recuperan datos de `localStorage`.

## Mocks / spies
Se usa `jasmine.createSpy()` para comprobar que un componente llama un callback sin tener que ejecutar una acción externa real. Por ejemplo, la prueba del botón Agregar comprueba que `onAdd` se llama con el producto esperado.

## Ejecutar
```bash
npm ci
npm run test:evaluacion
```

El reporte HTML se genera en `coverage/html/` y el resumen se muestra en la terminal. Los porcentajes pueden cambiar cuando se modifica el código; no se deben copiar cifras antiguas como si fueran resultados de la última ejecución.
