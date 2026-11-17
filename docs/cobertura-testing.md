# Pruebas del frontend — Gas El Volcán

## Objetivo

Validar el renderizado, las props, el estado, los eventos, las utilidades del carrito/productos y la validación de formularios React.

## Herramientas

Jasmine, Karma, ChromeHeadless, Karma Coverage, React y Bootstrap 5.

## 30 pruebas definidas

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
23. Checkout exige los datos obligatorios antes de enviar un pedido.
24. La ruta de las imágenes existentes se conserva.
25. ProductCard muestra las fotografías subidas guardadas como datos de imagen.
26. El procesamiento de fotografías rechaza archivos no compatibles.
27. La persistencia conserva la fotografía cargada.
28. Admin acepta fotografías JPG/PNG/WEBP y muestra la vista previa al editar.
29. Navbar limita el menú de VENDEDOR a productos, pedidos y cierre de sesión.
30. ProductCard oculta la opción de compra en modo de solo lectura.

## Mocks y preparación

Las pruebas de componentes reemplazan los callbacks por funciones simuladas; las pruebas de persistencia usan un almacenamiento temporal en memoria. Esta suite no prueba la conexión HTTP, JWT, CORS, MySQL ni los permisos reales del backend: eso requiere levantar ambos proyectos y hacer pruebas de integración aparte.

## Ejecución

```bash
npm install
npm run test:evaluacion
```

Karma genera el reporte actualizado en `coverage/html/index.html` cuando se ejecuta correctamente. Los reportes preexistentes son de una versión anterior y no corresponden a estas 28 pruebas. No se deben presentar como cobertura nueva.

Para demostrar calidad durante la defensa, ejecuta la suite actual y anota únicamente los resultados y porcentajes que genere en ese momento. No uses reportes preexistentes como prueba de la versión actual.
