# HectorMezaLab

Sitio estático del taller de **Héctor Meza** (HectorMezaLab, Honduras). El inicio es un catálogo de apps Android. **Prestaciones Laboral Honduras** (`com.hectormezalab.prestacioneshn`) es la primera ficha, no la identidad del sitio.

Repositorio: [soyache/hectormezalab](https://github.com/soyache/hectormezalab).

## Desarrollo

```bash
npm install
npm run build
```

La salida queda en `dist/`. `npm run dev` abre el sitio en local. `npm run preview` sirve `dist/`.

## Agregar una app

Edita `src/data/apps.ts` y suma un objeto al arreglo `apps`. Con eso se generan la tarjeta del inicio, `/apps/<slug>` y `/apps/<slug>/privacidad`.

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

- `/` portafolio y sección Apps
- `/apps/prestaciones-laboral` ficha de la primera app
- `/apps/prestaciones-laboral/privacidad` política para Google Play de esa app
- `/privacidad` privacidad del sitio
- `/app-ads.txt` autorización de AdMob, solo en la raíz
