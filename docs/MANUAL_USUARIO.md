# Manual de usuario — Gas El Volcán

**Versión:** Evaluación Parcial 3  
**Público:** clientes, vendedores y administradores de la tienda.

> Para la entrega académica, agrega capturas tomadas con el backend conectado donde se indica. No se incluyen capturas ficticias.

## Requisitos

- Navegador actualizado.
- Frontend iniciado con `npm run dev` o publicado en un servidor web.
- Backend Spring Boot y base de datos disponibles.
- URL de la API configurada en `VITE_API_BASE_URL`.

## Ingresar o crear una cuenta

1. Abre la tienda y selecciona **Cuenta**.
2. Para ingresar, escribe el correo y contraseña configurados en el backend.
3. Para registrarte como cliente, selecciona **Crear cuenta**, escribe tu nombre, correo y una contraseña de al menos ocho caracteres.
4. Si los datos son correctos, la cuenta y su rol se muestran en el panel de cuenta.

La aplicación conserva la sesión mediante una cookie HttpOnly emitida por el backend. Al recargar la página, verifica la sesión antes de mostrar las opciones correspondientes al rol.

**Captura 1 — Inicio de sesión o registro:** pendiente de tomar con el backend activo.

## Comprar como cliente

1. Usa el catálogo para filtrar por categoría o buscar un producto.
2. Selecciona **Ver detalle** para consultar información actualizada del producto.
3. Agrega productos al carrito y ajusta las cantidades.
4. Inicia sesión como CLIENTE si aún no lo has hecho.
5. En el checkout, completa los datos de entrega y selecciona el método de pago.
6. Presiona **Registrar pedido**. El backend vuelve a comprobar el precio y el stock.
7. La confirmación muestra el número, estado y total devueltos por la API.

No se procesa un pago real. No ingreses ni compartas datos de tarjeta: el backend registra el método seleccionado y crea un pedido pendiente.

**Captura 2 — Catálogo y detalle de producto:** pendiente de tomar con el backend activo.  
**Captura 3 — Carrito y validación del checkout:** pendiente de tomar con el backend activo.  
**Captura 4 — Pedido confirmado con ID y estado:** pendiente de tomar con el backend activo.

## Consultar productos y pedidos como vendedor

1. Inicia sesión con una cuenta VENDEDOR creada por el administrador del backend.
2. La barra de navegación muestra únicamente **Productos**, **Pedidos** y **Cerrar sesión**.
3. En **Productos**, revisa el catálogo y abre el detalle de cada artículo.
4. En **Pedidos**, consulta la lista y selecciona **Ver detalle** para obtener sus datos.

El rol vendedor no muestra carrito, checkout ni acciones para modificar productos.

**Captura 5 — Vista restringida del vendedor:** pendiente de tomar con el backend activo.  
**Captura 6 — Lista y detalle de pedidos:** pendiente de tomar con el backend activo.

## Administrar productos

1. Inicia sesión con una cuenta ADMIN.
2. Abre **Administración**.
3. Completa o modifica nombre, categoría, precio, stock, imagen y descripción.
4. Guarda el formulario. La aplicación utiliza los endpoints protegidos del backend para crear o actualizar el producto.
5. Para eliminar un producto, selecciona **Eliminar** y confirma. Si el backend rechaza la operación, se muestra el error.
6. Abre **Pedidos** para revisar ventas y detalles.

**Captura 7 — CRUD de productos como administrador:** pendiente de tomar con el backend activo.

## Cerrar sesión y errores

- Selecciona **Cerrar sesión** para invalidar la cookie de renovación en el backend y eliminar el access token de memoria.
- Si no se conecta el catálogo, confirma que Spring Boot está activo y que `VITE_API_BASE_URL` corresponde a su origen.
- Si aparece “No tienes permisos”, revisa la cuenta y el rol. Los permisos efectivos los aplica Spring Security en el backend.
- Si un pedido falla por stock, corrige la cantidad o consulta al administrador.

## Evidencia pendiente antes de entregar

Reemplaza los avisos de captura por pantallazos reales del sistema integrado, documentados con número, título, imagen y nota, como pide la plantilla oficial. No uses datos de acceso reales en las capturas.
