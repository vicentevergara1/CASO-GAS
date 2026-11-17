# Evaluación Parcial 3 — Gas El Volcán

## Relación del frontend con la pauta

| Requisito de la pauta | Implementación del frontend |
| --- | --- |
| IE3.2.2 / IE3.2.4 — Comunicación REST e integración | Catálogo, categorías, detalle, autenticación, operaciones de productos y pedidos usan endpoints versionados `/api/v1` del backend incluido. |
| IE3.3.2 / IE3.3.5 — Sesión persistente | Access token JWT solo en memoria; la cookie HttpOnly del backend permite renovar la sesión al recargar la página. |
| IE3.3.3 / IE3.3.6 — Restricción por permisos | ADMIN ve administración de productos y pedidos; VENDEDOR ve productos/detalles y pedidos; CLIENTE usa la tienda. Spring Security mantiene la autorización del lado servidor. |
| Integración de compra | El checkout envía productos, cantidades y datos de entrega al backend. El servidor verifica stock/precio y crea el pedido pendiente. |

## Funciones incluidas

- Tienda responsive, filtro por categoría, búsqueda y detalle consultado por API.
- Registro de cliente, login, refresco de sesión y logout.
- Carrito recuperable tras recarga. Solo conserva IDs y cantidades en el navegador.
- Administración de productos conectada al CRUD del backend, incluida la actualización del stock.
- Vista de pedidos para ADMIN y VENDEDOR, con lista y detalle.
- Manejo visible de errores de conexión, validación y autorización.

## No incluido o no verificado

- No existe pasarela de pago en el backend entregado. El checkout registra el método de pago elegido, pero no cobra ni almacena datos de tarjeta.
- No se verificó el backend en ejecución con MySQL, ni la conexión a AWS, porque no se proporcionó una dirección de despliegue activa.
- La entrega requiere capturas reales de pruebas integradas, y no se inventan en este documento.
- El ERS y el manual de usuario son documentos de entrega del equipo, no funcionalidades del frontend. El anexo de API y el manual recibidos tienen texto/ejemplos de Pokémon Go y deben corregirse antes de entregar.

## Recorrido sugerido de presentación

1. Iniciar backend y frontend. Mostrar catálogo y detalle cargados desde la API.
2. Iniciar sesión como ADMIN, crear o editar un producto y comprobar el cambio en el catálogo.
3. Cerrar sesión; entrar como VENDEDOR y mostrar que solo aparecen Productos y Pedidos.
4. Consultar la lista de pedidos y abrir el detalle de uno.
5. Entrar como CLIENTE, agregar productos, recargar la página y mostrar que se conserva el carrito.
6. Crear un pedido y comprobar en Swagger o en la vista de pedidos que el backend devolvió un ID y estado.
7. Explicar en `src/context/AuthContext.jsx` la sesión renovada por cookie y en `src/services/api.js` los headers Bearer y el manejo de `401`.

Usa cuentas de prueba configuradas localmente en el backend. No muestres las contraseñas, la clave JWT ni valores reales de `.env` durante la presentación.
