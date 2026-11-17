# Integración frontend y backend — Gas El Volcán

Este frontend usa el backend Spring Boot incluido por separado. Los datos del catálogo y los pedidos provienen de la API; no se generan respuestas simuladas cuando el backend no está disponible.

## Endpoints usados

| Acción en la tienda | Método y ruta | Acceso |
| --- | --- | --- |
| Listar productos y consultar detalle | `GET /api/v1/products`, `GET /api/v1/products/{id}` | Público |
| Listar categorías | `GET /api/v1/categories` | Público |
| Crear cuenta de cliente | `POST /api/v1/auth/register` | Público |
| Iniciar sesión | `POST /api/v1/auth/login` | Público |
| Renovar sesión | `POST /api/v1/auth/refresh` | Cookie HttpOnly |
| Cerrar sesión | `POST /api/v1/auth/logout` | Cookie HttpOnly |
| Consultar usuario activo | `GET /api/v1/auth/me` | JWT |
| Crear pedido | `POST /api/v1/orders` | CLIENTE o ADMIN |
| Listar pedidos y ver su detalle | `GET /api/v1/orders`, `GET /api/v1/orders/{id}` | ADMIN o VENDEDOR |
| Crear, editar o eliminar productos | `POST /api/v1/products`, `PUT /api/v1/products/{id}`, `DELETE /api/v1/products/{id}` | ADMIN |

Las rutas y los permisos de esta tabla se verificaron contra los controladores y la configuración Spring Security del backend entregado. No se usa el anexo de ejemplo de Pokémon para definir la integración.

## Sesión y permisos

- El access token JWT se conserva solo en memoria del navegador; no se guarda en `localStorage`.
- El backend entrega el refresh token en una cookie `HttpOnly`. Las solicitudes usan `credentials: "include"` y el frontend renueva la sesión al cargar la aplicación y después de un `401`.
- El cierre de sesión solicita invalidar la sesión en el backend y borra el access token en memoria.
- ADMIN puede gestionar productos y consultar pedidos.
- VENDEDOR ve únicamente el catálogo de productos y los pedidos; no se muestran navegación de tienda, carrito ni acciones de compra.
- CLIENTE puede usar la tienda y crear pedidos. La autorización definitiva la aplica también Spring Security; ocultar controles en React no reemplaza esa protección.

## Pedido y pagos

El checkout envía el identificador y cantidad de cada producto junto con los datos de entrega y el método elegido (`card`, `transfer` o `cash`). El backend vuelve a validar productos, stock y precios, descuenta stock en una transacción y crea un pedido con estado pendiente. Este proyecto no integra una pasarela ni procesa tarjetas; el frontend no solicita ni almacena número de tarjeta o CVV.

## Ejecución local

1. Inicia el backend y MySQL según el README del backend. Su URL local predeterminada es `http://localhost:8080`.
2. En la carpeta del frontend, copia `.env.example` como `.env` y ajusta `VITE_API_BASE_URL` si el backend usa otro host o puerto.
3. En el backend configura `FRONTEND_ORIGIN=http://localhost:5173`, `COOKIE_SAME_SITE=Lax` y `COOKIE_SECURE=false` para desarrollo local.
4. Ejecuta `npm install` y luego `npm run dev`.
5. Abre la URL que indique Vite. Swagger está disponible en el backend en `/swagger-ui/index.html`.

## Configuración para un backend en AWS

Define `VITE_API_BASE_URL` con la URL HTTPS pública del backend, sin agregar `/api` al final, antes de compilar el frontend. Para GitHub Pages, crea esa variable en **Settings → Secrets and variables → Actions → Variables** del repositorio; el workflow la inyecta durante la compilación y se detiene si no está configurada, para no publicar una versión que apunte a `localhost`. En el backend configura `FRONTEND_ORIGIN` con el origen exacto donde se publica el frontend, y usa `COOKIE_SAME_SITE=None` junto con `COOKIE_SECURE=true` cuando frontend y backend estén en sitios HTTPS distintos. No uses CORS con `*` cuando hay cookies. Vuelve a compilar y publicar el frontend después de cambiar la variable de Vite. Antes de publicarlo, verifica que la URL del backend abra desde el navegador del usuario final.

No se probó una conexión real con AWS desde este paquete: la dirección del despliegue y las credenciales se configuran en el entorno del propietario.

## Verificaciones pendientes para la entrega

- La compilación Vite y las 30 pruebas unitarias del frontend pasaron. Esas pruebas no ejercitan una API real.
- Probar login, renovación de cookie, registro, roles, CRUD y pedidos con MySQL y el backend en ejecución.
- Guardar capturas reales de Swagger y de los flujos integrados en el documento de integración y en el manual de usuario.
- Completar el ERS y revisar con el equipo la documentación oficial. Los anexos recibidos para documentación de API y manual están rellenados como una plantilla de Pokémon y contienen secciones de ejemplo, no evidencia de Gas El Volcán.
