# Gas El Volcán — Corrección de despliegue y push seguro (20/11/2026)

## Problema demostrado

El workflow exitoso #51 del 18 de noviembre de 2026 compiló con `https://3.80.86.195.nip.io`. La última dirección que el equipo había probado era `https://54.242.154.29.nip.io`; la dirección efectiva actual en AWS **debe confirmarse** antes de publicar. La causa era el uso de una variable de GitHub Actions que conservaba una IP anterior.

## Cambios mínimos

- `.env.production` registra el origen API (público, sin secretos), de forma versionada.
- `.gitignore` permite guardar **solo** `.env.production`, mientras mantiene ignorados los `.env` locales.
- `.github/workflows/deploy.yml` deja de utilizar la variable obsoleta de GitHub Actions y comprueba API, catálogo, categorías, CORS y JavaScript compilado antes de publicar.
- `scripts/validar-api-publica.mjs` y `scripts/validar-build-publico.mjs` detienen el despliegue si la URL o la integración tienen errores demostrables. No usan `curl -k` ni desactivan TLS.
- `src/services/api.js` explica mejor a qué servidor intentó conectarse si falla la red.

## Antes de hacer push

1. **AWS / EC2**: verifica en la consola de AWS la IP pública actual. Si no es `54.242.154.29`, edita `VITE_API_BASE_URL` en `.env.production` y confirma que Caddy acepte ese dominio con certificado válido. No cambies una IP por prueba.
2. **Windows, dentro del clon original de `CASO-GAS`**: `git status` y `git log -1 --oneline` para comprobar tu estado actual. Conserva `.git` y cualquier cambio de compañeros.
3. Aplica solo los archivos cambiados de este ZIP, o usa el parche `frontend-correcciones.patch` proporcionado por separado. Ejecuta `git apply --check ruta-del-parche` antes de aplicarlo. Si no aplica limpio, revisa las diferencias sin forzarlo.
4. Ejecuta `npm ci`, `node --test scripts/validar-config-publica.test.mjs`, `npm run build` y `node scripts/validar-build-publico.mjs`. `node scripts/validar-api-publica.mjs` necesita acceso real a la API desde la red donde se ejecute.
5. Revisa `git diff` y realiza commit y push **solo después de comprobar los cambios**. Usa `git add .env.production .gitignore .github/workflows/deploy.yml src/services/api.js scripts/validar-api-publica.mjs scripts/validar-build-publico.mjs scripts/validar-config-publica.test.mjs README.md docs/INTEGRACION_EVALUACION_3.md docs/GUIA_PUSH_SEGURO.md`.
6. Mira Actions: si la validación falla, el frontend anterior seguirá publicado. No modifiques Java, MariaDB, ni Caddy salvo que las pruebas indiquen un fallo propio de esos componentes.
7. Cuando Actions termine en verde, prueba `https://vicentevergara1.github.io/CASO-GAS/` en un navegador con F12 / Network. Confirma URL de `/api/v1/products`, JSON, categorías, fotos, login, cookies y roles. En Duoc `nip.io` puede estar bloqueado por FortiGuard aun si funciona con datos móviles.

**Importante:** hacer `git push` al backend por sí solo **no reinicia el JAR de EC2**. El problema de IP compilada se corrige en el **frontend**. No borres commits, no subas `.env` ni contraseñas y no hagas `git push --force`.
