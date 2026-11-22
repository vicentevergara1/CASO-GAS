# Gas El Volcán — Frontend Evaluación Parcial 3

Tienda React/Vite responsive para DSY1104, conectada al backend Spring Boot entregado. El catálogo, los detalles, el CRUD administrativo y los pedidos usan datos de la API; el carrito conserva solo los identificadores y cantidades en `localStorage`.

## Integrantes

| Nombre | GitHub |
| --- | --- |
| Vicente Vergara | [@vicentevergara1](https://github.com/vicentevergara1) |
| Juan Parra | [@juanalonsoparraverdejo](https://github.com/juanalonsoparraverdejo) |
| Benjamín Perez | [@Benja-ignacio](https://github.com/Benja-ignacio) |

Repositorio frontend: https://github.com/vicentevergara1/CASO-GAS

## Funcionalidad integrada

- Catálogo, categorías y detalle de producto consultados desde la API.
- Registro de cliente e inicio de sesión con validación del backend.
- Access token JWT mantenido en memoria; renovación de sesión con la cookie HttpOnly del backend y cierre de sesión.
- Navegación diferenciada: ADMIN gestiona productos y consulta pedidos; VENDEDOR consulta productos/detalles y pedidos; CLIENTE usa la tienda.
- CRUD de productos con nombre, categoría, precio, stock, imagen y descripción.
- Carrito persistido localmente; el backend vuelve a validar precio y stock al crear el pedido.
- Checkout que registra pedidos reales en la API; no solicita datos de tarjeta ni procesa pagos.
- Mensajes de conexión, errores HTTP y permisos insuficientes.

La protección del frontend mejora la interfaz, pero los permisos efectivos también los aplica Spring Security. Revisa los endpoints, roles y límites conocidos en `docs/INTEGRACION_EVALUACION_3.md`.

## Requisitos

- Node.js 18 o superior.
- Backend Spring Boot y MySQL ejecutándose para usar la integración.
- Google Chrome disponible si se ejecutan las pruebas de Karma.

## Instalar y ejecutar

Desde la carpeta raíz del frontend:

```bash
npm install
```

Copia `.env.example` como `.env` y ajusta `VITE_API_BASE_URL` al origen de la API, por ejemplo `http://localhost:8080`. En PowerShell:

```powershell
Copy-Item .env.example .env
```

En macOS/Linux:

```bash
cp .env.example .env
```

Luego ejecuta:

```bash
npm run dev
npm run build
npm run preview
npm run test:evaluacion
```

Para pruebas locales, el backend debe permitir el origen `http://localhost:5173`, habilitar cookies con credenciales y usar `COOKIE_SAME_SITE=Lax` y `COOKIE_SECURE=false`. Sigue el README del backend para configurar MySQL, JWT y usuarios ADMIN/VENDEDOR; no subas el `.env` del backend ni compartas las contraseñas.

## Publicación en GitHub Pages

La URL pública se define **una sola vez** en `.env.production` (versionado, sin contraseñas). El workflow ya **no usa** `vars.VITE_API_BASE_URL` de GitHub Actions porque el último despliegue incorporó una IP anterior. Antes de compilar verifica HTTPS, las rutas `GET /api/v1/products` y `GET /api/v1/categories`, el CORS hacia `https://vicentevergara1.github.io` y el preflight OPTIONS. Además comprueba que el JavaScript final contenga la dirección esperada. Si estas verificaciones fallan, **detiene** la publicación en vez de desplegar una compilación que muestre el antiguo error genérico. Si cambia la IP pública de EC2, cambia **solo** `.env.production` y vuelve a hacer push. Esto no reemplaza una Elastic IP o un dominio propio estable. Consulta `docs/GUIA_PUSH_SEGURO.md`.

## Archivos principales

- `src/main.jsx`: estado de tienda, catálogo y checkout.
- `src/services/api.js`: llamadas REST, manejo de errores y renovación JWT.
- `src/context/AuthContext.jsx`: inicio, registro, sesión y cierre.
- `src/components/Admin.jsx`: CRUD de productos restringido a ADMIN.
- `src/components/OrdersPanel.jsx`: lista y detalle de pedidos para ADMIN/VENDEDOR.
- `src/components/Checkout.jsx`: validación y envío del pedido a la API.
- `docs/INTEGRACION_EVALUACION_3.md`: endpoints, roles y guía para AWS.
- `docs/MANUAL_USUARIO.md`: pasos de uso y lista de capturas reales pendientes.

## Estado de las verificaciones

- `npm run build`: correcto.
- `npm run test:evaluacion`: 30 de 30 pruebas unitarias correctas en Chrome Headless.
- La suite no es una prueba end-to-end: no verifica conexión HTTP real, MySQL, CORS ni permisos en un backend activo.
- No se probó el backend en AWS porque no se proporcionó una URL pública del despliegue.

Los anexos recibidos para documentación de API y manual de usuario son plantillas de Pokémon Go y no sirven como evidencia del caso Gas El Volcán; deben reemplazarse o completarse con capturas reales.
