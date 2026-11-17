# Guía para presentar el código — Gas El Volcán

## Recorrido funcional

1. Iniciar Spring Boot y MySQL; luego abrir el frontend con `npm run dev`.
2. Mostrar que productos y categorías llegan desde el backend.
3. Abrir el detalle de un producto para explicar la consulta `GET /api/v1/products/{id}`.
4. Iniciar sesión con una cuenta ADMIN de prueba, modificar stock o precio y comprobar el cambio en la tienda.
5. Cerrar sesión y entrar con una cuenta VENDEDOR. Mostrar que su navegación solo presenta productos y pedidos; abrir un pedido y revisar sus líneas.
6. Entrar con una cuenta CLIENTE, agregar al carrito, recargar y comprobar que se conservan IDs y cantidades.
7. Enviar un pedido válido y mostrar el ID y estado que devuelve el backend.
8. Probar una cantidad mayor al stock y explicar el mensaje de error que devuelve la API.
9. Ejecutar `npm run test:evaluacion` y `npm run build`; presentar únicamente resultados obtenidos en ese momento.

## Archivos que conviene explicar

- `src/main.jsx`: obtiene los datos, mantiene carrito y navegación, y conecta tienda con checkout.
- `src/services/api.js`: agrega el JWT, incluye cookies, renueva la sesión cuando recibe `401` y traduce errores HTTP.
- `src/context/AuthContext.jsx`: realiza login/registro/logout y restaura al recargar mediante la cookie HttpOnly.
- `src/components/Admin.jsx`: formulario y acciones de administración que llaman al backend.
- `src/components/OrdersPanel.jsx`: lista y detalle de pedidos disponibles para ADMIN y VENDEDOR.
- `src/components/Checkout.jsx`: valida los datos antes de enviar el pedido.
- `src/components/ProductCatalog.jsx`: filtros y detalle con consulta a la API.

## Preguntas de defensa

**¿Dónde queda el JWT?** El access token queda en memoria de JavaScript y se envía como `Authorization: Bearer`. El refresh token lo administra Spring Boot en una cookie `HttpOnly`; React no puede leerla.

**¿Qué pasa al recargar?** React solicita `/api/v1/auth/refresh`. El backend valida la cookie y devuelve un access token nuevo y los datos de la cuenta.

**¿Cómo se limitan los roles?** React oculta funciones que el rol no debe usar, pero Spring Security también valida cada endpoint. La protección del servidor es la que impide accesos directos.

**¿Quién calcula el precio final del pedido?** El backend. El frontend envía IDs y cantidades; el servidor vuelve a leer precios y stock desde la base de datos.

**¿El pago es real?** No. El backend entregado registra un pedido pendiente y un método seleccionado; no contiene una pasarela ni procesa tarjetas.

## Antes de exponer

- Completar la prueba local con MySQL y guardar capturas reales de login, roles, producto y pedido.
- Revisar Swagger y la configuración del origen CORS.
- No mostrar contraseñas ni valores reales de variables de entorno.
- El material recibido para el manual y la documentación de APIs contiene ejemplos de Pokémon Go; reemplázalos por evidencia de Gas El Volcán.
