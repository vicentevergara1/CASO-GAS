# Cobertura de testing - Gas El Volcan

## Objetivo
Validar la logica y el comportamiento de los componentes principales del frontend React de Gas El Volcan.

## Herramientas
- Jasmine
- Karma
- ChromeHeadless
- Karma Coverage
- React
- Bootstrap 5

## 10 pruebas
1. Navbar renderiza el nombre de la tienda.
2. Navbar recibe y muestra `cartCount` mediante props.
3. ProductCard muestra datos recibidos mediante props.
4. ProductCard ejecuta el callback `onAdd`.
5. ProductCatalog renderiza el catalogo.
6. ProductCatalog cambia estado al seleccionar categoria.
7. Cart calcula el total.
8. Cart ejecuta `onRemove`.
9. SearchModal muestra coincidencias.
10. SearchModal maneja el caso sin resultados.

## Mocks
Los callbacks como `onAdd`, `onRemove`, `onClose` y otros se reemplazan por funciones mock durante las pruebas. Esto permite probar cada componente de forma aislada sin depender de un backend.

## Ejecucion
```bash
npm install
npm run test:evaluacion
```

El reporte de cobertura se genera en `coverage/html/`.
