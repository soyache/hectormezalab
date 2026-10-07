/**
 * Catálogo de HectorMezaLab. Para sumar una app, agrega un objeto a `apps`.
 * El inicio, la ficha y la privacidad de cada app salen de esta lista.
 * app-ads.txt vive solo en la raíz del sitio (`public/app-ads.txt`).
 * AdMob no lee copias bajo /apps/ ni bajo el paquete.
 */
export type AppRecord = {
  slug: string;
  name: string;
  summary: string;
  platform: 'Android';
  status: 'publicada';
  packageId: string;
  playUrl?: string;
  /** Nota breve en la tarjeta. El aviso completo vive en la ficha. */
  cardNote?: string;
  /** Pasos reales de la app, en el orden de uso. */
  steps: string[];
  /** Viñeta propia de la ficha. No la reutilices en otra app. */
  sample?: 'boleta';
  disclaimer?: {
    text: string;
    links: { href: string; label: string }[];
  };
  privacy: {
    intro: string;
    /**
     * 'admob' incluye en la política la divulgación del SDK de Google Mobile Ads.
     * No lo marques si la app no muestra anuncios con AdMob.
     */
    ads?: 'admob';
  };
};

export const apps: AppRecord[] = [
  {
    slug: 'prestaciones-laboral',
    name: 'Prestaciones Laboral Honduras',
    summary:
      'Estima en lempiras el preaviso, la cesantía, el aguinaldo, el décimo cuarto y las vacaciones a partir del salario y las fechas que escribes.',
    platform: 'Android',
    status: 'publicada',
    packageId: 'com.hectormezalab.prestacioneshn',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hectormezalab.prestacioneshn',
    cardNote: 'Cálculo informativo. No es la Secretaría de Trabajo ni el Gobierno de Honduras.',
    sample: 'boleta',
    steps: [
      'Indica si hubo despido y elige la fecha inicial y la final.',
      'Escribe el salario y activa los rubros que entran en tu caso.',
      'Revisa el total en lempiras, el desglose y la gráfica de esa suma.',
    ],
    disclaimer: {
      text: 'No es la Secretaría de Trabajo y Seguridad Social ni un servicio del Gobierno de Honduras. El resultado es informativo: no es una liquidación oficial ni reemplaza asesoría laboral.',
      links: [
        { href: 'https://www.trabajo.gob.hn/', label: 'Secretaría de Trabajo y Seguridad Social' },
        {
          href: 'https://tsc.gob.hn/web/leyes/codigo_de_trabajo.pdf',
          label: 'Código de Trabajo (PDF)',
        },
      ],
    },
    privacy: {
      intro:
        'El salario, las fechas y los rubros que usted escribe se usan en el dispositivo para el cálculo y no los enviamos a nuestros servidores. La aplicación no tiene un servidor propio. No se requiere una cuenta para ver el resultado.',
      ads: 'admob',
    },
  },
];

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}
