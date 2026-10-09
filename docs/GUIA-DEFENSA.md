# Guía de defensa oral — Gas El Volcán

Esta guía prepara respuestas posibles sobre el proyecto y su implementación. Practica explicándolas con tus propias palabras y señalando el archivo correspondiente. No memorices sin entender: el profesor puede pedirte mostrar el comportamiento en vivo.

## 1. ¿Qué hace el proyecto?
**Respuesta sugerida:** Es una tienda web de demostración para Gas El Volcán. Permite consultar productos, buscar y filtrar el catálogo, ver detalles, agregar productos al carrito, cambiar cantidades, pasar por un checkout validado, simular confirmación o rechazo de pago y administrar productos. El frontend está construido con React, Vite y Bootstrap.

## 2. ¿Qué es React y por qué se utilizó?
**Respuesta sugerida:** React es una biblioteca de JavaScript para construir interfaces a partir de componentes reutilizables. En este proyecto separé la interfaz en piezas como `Navbar`, `ProductCatalog`, `ProductCard`, `Cart`, `Checkout` y `Admin`, lo que facilita mantener y probar cada parte.

## 3. ¿Qué es un componente?
**Respuesta sugerida:** Es una pieza de interfaz reutilizable que normalmente se escribe como una función que devuelve JSX. Por ejemplo, `ProductCard.jsx` dibuja una tarjeta para un producto. El catálogo usa ese componente una vez por cada producto.

## 4. ¿Qué es JSX?
**Respuesta sugerida:** Es una sintaxis que permite escribir una estructura parecida a HTML dentro de JavaScript. React transforma ese JSX para construir los elementos que se muestran en el navegador.

## 5. ¿Qué son las props?
**Respuesta sugerida:** Son datos o funciones que un componente recibe desde su componente padre. Por ejemplo, `ProductCard` recibe `product`, `onAdd` y `onDetail`; `product` contiene los datos y los callbacks avisan al padre cuando el usuario hace una acción.

## 6. ¿Qué es el estado (`useState`)?
**Respuesta sugerida:** Es información que React mantiene entre renderizados. Cuando cambia, React vuelve a renderizar la parte de interfaz que depende de ese estado. Se usa para el carrito, el menú móvil, el filtro, el formulario de checkout y el formulario de administración.

## 7. ¿Qué diferencia hay entre props y estado?
**Respuesta sugerida:** Las props llegan desde el padre y el componente las recibe; el estado pertenece al componente que lo administra y puede cambiar con sus funciones setter. Un padre puede pasar una función por props para que un hijo solicite un cambio.

## 8. ¿Para qué sirve `useEffect`?
**Respuesta sugerida:** Permite ejecutar efectos secundarios relacionados con el ciclo de vida del componente. En `main.jsx` se usa para guardar el carrito y los pedidos cuando cambian; en `Admin.jsx` se usa para escuchar eventos y refrescar los datos mostrados.

## 9. ¿Para qué sirve `useMemo`?
**Respuesta sugerida:** Memoriza el resultado de un cálculo entre renderizados mientras sus dependencias no cambien. Aquí se usa para calcular el total de unidades del carrito y los resultados filtrados del catálogo. No reemplaza al estado; optimiza cálculos derivados.

## 10. ¿Qué es React DOM / `createRoot`?
**Respuesta sugerida:** React DOM conecta la aplicación React con el DOM del navegador. En `main.jsx`, `createRoot(document.getElementById("root")).render(<App />)` monta el componente principal dentro del elemento `root` de `index.html`.

## 11. ¿Qué es Bootstrap y cómo se demuestra el responsive?
**Respuesta sugerida:** Bootstrap es un framework CSS que ofrece grillas, botones, formularios y utilidades responsivas. Por ejemplo, las clases `col-12`, `col-md-6`, `col-lg-4` cambian el ancho según el tamaño de pantalla. También hay media queries en `src/styles.css`. Para demostrarlo, se puede estrechar la ventana o usar el modo dispositivo del navegador.

## 12. ¿Qué es Vite?
**Respuesta sugerida:** Es la herramienta de desarrollo y compilación del proyecto. `npm run dev` inicia el servidor local y `npm run build` genera el sitio optimizado en `dist`. `vite.config.js` configura `base: '/CASO-GAS/'` para que las rutas funcionen en GitHub Pages bajo ese repositorio.

## 13. ¿Cómo funciona el CRUD?
**Respuesta sugerida:** CRUD significa Create, Read, Update y Delete: crear, consultar, actualizar y eliminar. Las funciones están en `src/data/products.js`: `createProduct`, `getProducts`, `updateProduct` y `deleteProduct`. El panel `Admin.jsx` llama esas funciones y refresca el catálogo después de cada operación.

## 14. ¿Qué es `localStorage` y qué guarda aquí?
**Respuesta sugerida:** Es almacenamiento del navegador que conserva texto entre recargas en el mismo navegador y dispositivo. En este proyecto guarda el carrito, el catálogo editado, los usuarios de demostración y los pedidos. No es una base de datos remota y no sincroniza datos entre equipos.

## 15. ¿La aplicación tiene backend o base de datos?
**Respuesta sugerida:** No. Es un frontend académico con persistencia local en `localStorage`. Para producción habría que agregar un backend y una base de datos para que usuarios y pedidos fueran compartidos y seguros.

## 16. ¿El pago es real?
**Respuesta sugerida:** No. El checkout valida el formulario y simula los estados de pago para poder demostrar el flujo. No se conecta con un banco ni procesa tarjetas. Si se usa una tarjeta de prueba que termina en `0000`, muestra un rechazo simulado.

## 17. ¿Qué validaciones tiene el checkout?
**Respuesta sugerida:** Comprueba que los datos de entrega estén completos, valida el formato del correo y, si se selecciona tarjeta, pide número, vencimiento y CVV. Si falta información, muestra un mensaje condicional con `role="alert"` y no avanza al éxito.

## 18. ¿Qué son Jasmine y Karma?
**Respuesta sugerida:** Jasmine es el framework que define pruebas, expectativas y spies. Karma ejecuta esas pruebas en un navegador; aquí se configura ChromeHeadless para correr sin abrir una ventana normal. `npm run test:evaluacion` lanza la suite en modo de una sola ejecución.

## 19. ¿Qué es un test unitario?
**Respuesta sugerida:** Es una prueba que verifica una unidad pequeña de comportamiento, por ejemplo que `ProductCard` muestre el nombre o que `Cart` calcule el total esperado. Las pruebas permiten detectar regresiones cuando se cambia el código.

## 20. ¿Qué es un mock o spy de Jasmine?
**Respuesta sugerida:** Un spy registra si una función fue llamada y con qué argumentos. Por ejemplo, la prueba de `ProductCard` usa `jasmine.createSpy("onAdd")` y comprueba que al pulsar Agregar se llamó con el producto correcto. Así se verifica la comunicación entre componentes sin ejecutar un servicio externo.

## 21. ¿Qué significa cobertura de código?
**Respuesta sugerida:** Es una medida de qué parte del código se ejecuta durante las pruebas. Puede medirse por sentencias, líneas, funciones y ramas. Una cobertura alta no garantiza que no existan errores: también importa que los casos de prueba sean relevantes.

## 22. ¿Dónde se revisan los resultados de pruebas?
**Respuesta sugerida:** En la terminal después de `npm run test:evaluacion`; Karma también genera un reporte HTML en `coverage/html/`. Los porcentajes pueden cambiar según los cambios de código y deben citarse desde la última ejecución, no desde un reporte antiguo.

## 23. ¿Qué hace la vista de administración?
**Respuesta sugerida:** Permite crear, editar y eliminar productos y muestra los productos actuales, los usuarios registrados y los pedidos guardados localmente. También puede exportar los pedidos a un archivo JSON. Es una demostración académica, no un panel con autenticación segura.

## 24. ¿Cómo se guarda un pedido?
**Respuesta sugerida:** Cuando se confirma el flujo simulado, `Checkout` entrega un objeto de pedido a `main.jsx`. El componente principal lo añade al estado `orders`, y `useEffect` guarda ese estado en `localStorage`. El panel lee esos pedidos para mostrarlos.

## 25. ¿Cómo se publica en GitHub Pages?
**Respuesta sugerida:** El workflow de `.github/workflows/deploy.yml` se ejecuta al hacer push a `main`. Instala dependencias, ejecuta las pruebas, compila el proyecto y publica `dist` con GitHub Pages. La opción de Pages en Settings debe estar configurada para GitHub Actions.

## 26. ¿Qué limitaciones tiene el proyecto?
**Respuesta sugerida:** No tiene backend, autenticación real ni pagos reales. `localStorage` es local y puede ser modificado por quien usa el navegador. En un sistema real habría que validar también en el servidor, proteger rutas administrativas y no guardar contraseñas ni datos bancarios en el navegador.

## 27. Si el profesor pregunta “¿qué parte hiciste tú?”
**Respuesta sugerida:** Responde de manera honesta sobre lo que implementaste y lo que recibiste como ayuda. Luego demuestra que comprendes el flujo: explica el componente, señala su archivo y modifica una pequeña parte si te lo piden.

## Preguntas prácticas que podrían pedirte demostrar
- Cambia un filtro y explica el estado que se actualiza.
- Agrega dos productos, aumenta una cantidad y explica cómo se calcula el total.
- Recarga la página y explica por qué el carrito sigue allí.
- Deja un campo vacío en el checkout y explica el mensaje de error.
- Simula un pago rechazado con una tarjeta terminada en `0000`.
- Crea, edita y elimina un producto en Administración.
- Abre `src/tests/components.spec.jsx` y explica un `expect` y un spy.
- Explica qué hace `npm run build` y dónde se genera `dist`.
