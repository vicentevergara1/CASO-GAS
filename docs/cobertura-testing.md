# Cobertura de testing - Gas El Volcán

## Objetivo

Validar el renderizado, las props, el estado, los eventos, el CRUD y la persistencia del frontend React.

## Herramientas

Jasmine, Karma, ChromeHeadless, Karma Coverage, React y Bootstrap 5.

## 23 pruebas definidas

1. Navbar renderiza El Volcán.
2. Navbar muestra `cartCount` mediante props.
3. ProductCard muestra nombre y precio recibidos.
4. ProductCard ejecuta `onAdd`.
5. ProductCatalog muestra todos los productos.
6. ProductCatalog cambia el filtro por categoría.
7. Cart calcula el total y muestra Ir a pagar.
8. Checkout muestra los datos de entrega y el resumen.
9. SearchModal muestra coincidencias.
10. SearchModal muestra el mensaje sin resultados.
11. SearchModal muestra imagen, precio y controles de carrito.
12. SearchModal agrega la cantidad elegida.
13. SearchModal aplica un filtro por categoría.
14. `readProducts` entrega el catálogo inicial sin datos almacenados.
15. `createProduct` crea un producto con ID único.
16. `updateProduct` cambia el precio sin mutar el original.
17. `deleteProduct` elimina un producto por ID.
18. `createProduct` rechaza precios inválidos.
19. `saveProducts` y `readProducts` guardan y recuperan el catálogo.
20. `saveCart` y `readCart` guardan y recuperan cantidades.
21. `readCart` ignora los productos eliminados.
22. Admin permite seleccionar un producto para editar.
23. Checkout tiene el botón de error de pago simulado y exige validar los datos.

## Mocks y preparación

Las pruebas de componentes reemplazan los callbacks por funciones simuladas; las pruebas de persistencia utilizan un objeto de almacenamiento temporal en memoria para no modificar los datos del navegador real.

## Ejecución

```bash
npm install
npm run test:evaluacion
```

Karma genera el reporte actualizado en `coverage/html/index.html` cuando se ejecuta correctamente. Los reportes preexistentes son de una versión anterior y no corresponden a estas 23 pruebas. No se deben presentar como cobertura nueva.

Para demostrar calidad durante la defensa, ejecuta la suite actual, verifica que las 23 pruebas terminen correctamente y anota los porcentajes de líneas, funciones y ramas que entrega el nuevo reporte.
