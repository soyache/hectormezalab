# HectorMezaLab

Sitio estático del taller de **Héctor Meza** (HectorMezaLab, Honduras). El inicio agrupa apps de Google Play, software para negocios y descargas directas. **Prestaciones Laboral Honduras** (`com.hectormezalab.prestacioneshn`) es una ficha del catálogo, no la identidad del sitio.

Repositorio: [soyache/hectormezalab](https://github.com/soyache/hectormezalab).

## Desarrollo

```bash
npm install
npm run build
```

La salida queda en `dist/`. `npm run dev` abre el sitio en local. `npm run preview` sirve `dist/`.

## Agregar un proyecto

Edita `src/data/apps.ts` y suma un objeto al arreglo `apps`.

- `publicada`, `descarga` y `negocio` entran en el inicio y generan `/apps/<slug>`.
- `prueba` y `no-publicada` no entran en el inicio. Si traen `privacy`, solo generan `/apps/<slug>/privacidad`.
- La política `/apps/<slug>/privacidad` se genera únicamente cuando el objeto trae `privacy`.

No crees `app-ads.txt` dentro de la ficha ni bajo el paquete. AdMob solo consulta la raíz del sitio web del desarrollador.

## Cloudflare Pages

Conecta este repositorio en Cloudflare Pages. No hace falta comprar un dominio: `https://hectormezalab.pages.dev` (o el subdominio que asigne Pages) es la raíz que debe ir en Play Console como sitio web del desarrollador. Así un solo `/app-ads.txt` cubre todas las apps que declaren ese sitio.

| Campo | Valor |
| --- | --- |
| Nombre sugerido del proyecto | `hectormezalab` |
| Directorio raíz | `.` (raíz del repo) |
| Framework | Astro |
| Comando de compilación | `npm run build` |
| Directorio de salida | `dist` |

Tras el deploy, `https://<proyecto>.pages.dev/app-ads.txt` tiene que mostrar exactamente:

```
google.com, pub-1708281453858574, DIRECT, f08c47fec0942fa0
```

Ese archivo sale de `public/app-ads.txt` y queda en la raíz de `dist/`. `robots.txt` lo permite. No lo bloquees y no lo dupliques en otra ruta.

## Páginas

- `/` portafolio, con las secciones Apps Android en Google Play, Software para negocios y Descarga directa
- `/apps/prestaciones-laboral` ficha de Prestaciones Laboral Honduras
- `/apps/prestaciones-laboral/privacidad` política para Google Play de esa app
- `/privacidad` privacidad del sitio y listado de las políticas que sí existen
- `/app-ads.txt` autorización de AdMob, solo en la raíz
