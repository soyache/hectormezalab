/**
 * Catálogo de HectorMezaLab. Para sumar un proyecto, agrega un objeto a `apps`.
 * `publicada`: tarjeta, ficha y, si trae `privacy`, política.
 * `descarga` y `negocio`: tarjeta y ficha. Política solo si trae `privacy`.
 * `prueba`: solo `/apps/<slug>/privacidad` y el listado de `/privacidad`, en prueba cerrada.
 * `no-publicada`: igual, sin ficha ni enlace a Play, y sin decir que está en prueba.
 * Esas dos no entran en el catálogo del inicio.
 * app-ads.txt vive solo en la raíz del sitio (`public/app-ads.txt`).
 * AdMob no lee copias bajo /apps/ ni bajo el paquete.
 */
export type TextPart = string | { href: string; label: string };

export type PrivacyBlock =
  | { type: 'p'; parts: TextPart[] }
  | { type: 'ul'; items: string[] };

export type PrivacySection = {
  heading: string;
  /** Por ejemplo `en` en la versión corta en inglés. */
  lang?: string;
  blocks: PrivacyBlock[];
};

/** Política con texto propio. No reutiliza el texto fijo de Prestaciones. */
export type DocumentPrivacy = {
  lead: string;
  sections: PrivacySection[];
};

/** Política que sigue renderizando la página fija de Prestaciones Laboral. */
export type CatalogPrivacy = {
  intro: string;
  /**
   * 'admob' incluye en la política la divulgación del SDK de Google Mobile Ads.
   * No lo marques si la app no muestra anuncios con AdMob.
   */
  ads?: 'admob';
};

export type AppStatus = 'publicada' | 'prueba' | 'no-publicada' | 'descarga' | 'negocio';

export type AppRecord = {
  slug: string;
  name: string;
  summary: string;
  platform: string;
  status: AppStatus;
  packageId?: string;
  playUrl?: string;
  /** Instalador público. No enlaces un repositorio privado. */
  downloadUrl?: string;
  downloadLabel?: string;
  contact?: { href: string; label: string };
  /** Nota breve en la tarjeta. El aviso completo vive en la ficha. */
  cardNote?: string;
  /** Pasos reales de la app, en el orden de uso. Omítelos si no constan. */
  steps?: string[];
  /** Viñeta propia de la ficha. No la reutilices en otra app. */
  sample?: 'boleta';
  disclaimer?: {
    text: string;
    links: { href: string; label: string }[];
  };
  /** Si falta, no se genera `/apps/<slug>/privacidad`. */
  privacy?: CatalogPrivacy | DocumentPrivacy;
  /** Fecha visible de la política. Si falta, queda la de las políticas anteriores. */
  privacyUpdated?: string;
};

const googlePartner = {
  href: 'https://policies.google.com/technologies/partner-sites',
  label: 'Cómo usa Google los datos de las apps de sus socios',
};

const googlePrivacy = {
  href: 'https://policies.google.com/privacy',
  label: 'Política de privacidad de Google',
};

const contactEmail = {
  href: 'mailto:hectormezalab@gmail.com',
  label: 'hectormezalab@gmail.com',
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
  {
    slug: 'spelling-bee',
    name: 'Spelling Bee',
    summary:
      'Dictado de Palabras – Spelling. Las listas de palabras, el idioma elegido y las estadísticas se guardan solo en el dispositivo.',
    platform: 'Android',
    status: 'publicada',
    packageId: 'com.hectormezalab.spellingbee',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hectormezalab.spellingbee',
    privacy: {
      lead: 'Esta política explica cómo la aplicación Spelling Bee (paquete com.hectormezalab.spellingbee), desarrollada por HectorMezaLab («nosotros»), trata la información cuando usted la usa.',
      sections: [
        {
          heading: 'Resumen',
          blocks: [
            {
              type: 'ul',
              items: [
                'No hay cuentas ni inicio de sesión.',
                'Las listas de palabras (una por cada idioma que usted aprende), el idioma elegido y las estadísticas se guardan solo en el dispositivo. No las recibimos ni las enviamos a ningún servidor nuestro.',
                'La aplicación muestra anuncios de Google AdMob, que puede recopilar ciertos datos del dispositivo para servir y medir anuncios.',
                'Usted puede eliminar los anuncios con una compra única gestionada por Google Play.',
              ],
            },
          ],
        },
        {
          heading: '1. Información que se guarda en el dispositivo',
          blocks: [
            {
              type: 'p',
              parts: [
                'Para funcionar, la aplicación guarda localmente, en el almacenamiento privado de la aplicación:',
              ],
            },
            {
              type: 'ul',
              items: [
                'Las listas de palabras que usted agrega, una por cada idioma que aprende (inglés, español, francés, alemán o italiano).',
                'El idioma que usted eligió aprender.',
                'Estadísticas de juego por idioma (partidas jugadas, aciertos, mejor puntaje).',
                'Si usted compró la eliminación de anuncios, y sus preferencias de consentimiento de anuncios.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Esta información no sale del dispositivo por nuestra parte. Se borra si usted desinstala la aplicación o borra sus datos desde los ajustes de Android.',
              ],
            },
          ],
        },
        {
          heading: '2. Pronunciación de palabras (texto a voz)',
          blocks: [
            {
              type: 'p',
              parts: [
                'Para pronunciar las palabras, la aplicación usa el motor de texto a voz instalado en el dispositivo (por ejemplo, Google Speech Services). La aplicación prefiere voces que funcionan sin conexión. Si el motor usa una voz en línea, el texto de la palabra puede ser procesado por el proveedor de ese motor según su propia política de privacidad.',
              ],
            },
          ],
        },
        {
          heading: '3. Publicidad (Google AdMob)',
          blocks: [
            {
              type: 'p',
              parts: [
                'La versión gratuita muestra anuncios mediante Google AdMob. Google puede recopilar y usar datos como el identificador de publicidad del dispositivo, la dirección IP, información del dispositivo y del sistema, e interacciones con los anuncios, para mostrar, medir y, cuando usted lo permita, personalizar anuncios.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Si usted está en el Espacio Económico Europeo, el Reino Unido o Suiza, la aplicación le pedirá su consentimiento mediante la plataforma de mensajes de Google (UMP) antes de mostrar anuncios personalizados. Puede cambiar su elección desde la opción «Privacy options» en la pantalla de configuración.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Puede restablecer o desactivar el identificador de publicidad en los ajustes de Android (Google, Anuncios).',
              ],
            },
            {
              type: 'p',
              parts: ['Más información: ', googlePartner, ' y ', googlePrivacy, '.'],
            },
          ],
        },
        {
          heading: '4. Compras dentro de la aplicación',
          blocks: [
            {
              type: 'p',
              parts: [
                'La compra única para eliminar anuncios la procesa Google Play. No recibimos ni guardamos los datos de su tarjeta ni de su cuenta de pago. Google nos informa únicamente si la compra se realizó, para poder desactivar los anuncios y restaurarla si usted reinstala la aplicación.',
              ],
            },
          ],
        },
        {
          heading: '5. Información que no recopilamos',
          blocks: [
            {
              type: 'p',
              parts: [
                'No recopilamos su nombre, correo, contactos, ubicación precisa, fotos, micrófono ni ningún otro dato personal. La aplicación no tiene cuentas de usuario.',
              ],
            },
          ],
        },
        {
          heading: '6. Menores de edad',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación está dirigida al público general y no está diseñada específicamente para niños menores de 13 años. No recopilamos a sabiendas datos personales de niños. Si usted cree que un niño nos proporcionó información, contáctenos y la eliminaremos.',
              ],
            },
          ],
        },
        {
          heading: '7. Seguridad',
          blocks: [
            {
              type: 'p',
              parts: [
                'Los datos locales se guardan en el almacenamiento privado de la aplicación, al que otras aplicaciones no pueden acceder. Ningún método de almacenamiento es 100 % seguro, pero aplicamos medidas razonables.',
              ],
            },
          ],
        },
        {
          heading: '8. Sus derechos',
          blocks: [
            {
              type: 'p',
              parts: [
                'Como no tenemos sus datos en nuestros servidores, usted puede ejercer el control directamente: borrar palabras desde la aplicación, borrar los datos de la aplicación desde los ajustes de Android o desinstalarla. Para los datos de publicidad, use las opciones de privacidad de la aplicación o los ajustes de anuncios de Google.',
              ],
            },
          ],
        },
        {
          heading: '9. Cambios de esta política',
          blocks: [
            {
              type: 'p',
              parts: [
                'Podemos actualizar esta política. Publicaremos la versión nueva en esta página con su fecha de actualización.',
              ],
            },
          ],
        },
        {
          heading: '10. Contacto',
          blocks: [
            {
              type: 'p',
              parts: ['Si tiene preguntas sobre esta política, escríbanos a ', contactEmail, '.'],
            },
          ],
        },
        {
          heading: 'Privacy Policy – Spelling Bee',
          lang: 'en',
          blocks: [
            { type: 'p', parts: ['Last updated: October 7, 2026.'] },
            {
              type: 'p',
              parts: [
                "Spelling Bee (com.hectormezalab.spellingbee), by HectorMezaLab, has no accounts or login. Your word lists (one per learning language), your chosen learning language and your game statistics are stored only on your device and are never sent to our servers. Words are spoken by your device's text-to-speech engine; if that engine uses an online voice, its provider may process the word text under its own policy.",
              ],
            },
            {
              type: 'p',
              parts: [
                'The free version shows ads from Google AdMob, which may collect the device advertising ID, IP address, device information and ad interactions to serve, measure and, with your consent, personalize ads. Users in the EEA, UK and Switzerland are asked for consent through Google\'s User Messaging Platform and can change it via "Privacy options" in the settings screen. See how Google uses data from partner apps: ',
                {
                  href: 'https://policies.google.com/technologies/partner-sites',
                  label: 'https://policies.google.com/technologies/partner-sites',
                },
              ],
            },
            {
              type: 'p',
              parts: [
                'The one-time "remove ads" purchase is processed by Google Play; we never receive your payment details, only whether the purchase exists. We do not collect names, emails, contacts, location, photos or microphone data. The app is intended for a general audience and is not directed at children under 13. We may update this policy and will post changes here. Contact: ',
                contactEmail,
                '.',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'practicar-multiplicaciones',
    name: 'Practicar Multiplicaciones',
    summary: 'La racha de práctica y el ejercicio actual se guardan solo en el dispositivo.',
    platform: 'Android',
    status: 'prueba',
    packageId: 'com.soyache.sallymath',
    privacy: {
      lead: 'Esta política explica cómo la aplicación Practicar Multiplicaciones (paquete com.soyache.sallymath), desarrollada por HectorMezaLab («nosotros»), trata la información cuando usted la usa.',
      sections: [
        {
          heading: 'Resumen',
          blocks: [
            {
              type: 'ul',
              items: [
                'No hay cuentas ni inicio de sesión.',
                'La racha de práctica y el ejercicio actual se guardan solo en el dispositivo. No los recibimos ni los enviamos a ningún servidor nuestro.',
                'La aplicación muestra anuncios de Google AdMob, que puede recopilar ciertos datos del dispositivo para servir y medir anuncios, además de fines de análisis y prevención de fraude.',
                'Usted puede quitar los anuncios con una compra única gestionada por Google Play.',
              ],
            },
          ],
        },
        {
          heading: '1. Información que se guarda en el dispositivo',
          blocks: [
            {
              type: 'p',
              parts: [
                'Para funcionar, la aplicación guarda localmente, en el almacenamiento privado de la aplicación:',
              ],
            },
            {
              type: 'ul',
              items: ['La racha de práctica.', 'El ejercicio actual.'],
            },
            {
              type: 'p',
              parts: [
                'Esta información no sale del dispositivo por nuestra parte. Se borra si usted desinstala la aplicación o borra sus datos desde los ajustes de Android.',
              ],
            },
            {
              type: 'p',
              parts: ['La aplicación no requiere una cuenta.'],
            },
          ],
        },
        {
          heading: '2. Publicidad (Google AdMob)',
          blocks: [
            {
              type: 'p',
              parts: [
                'La versión gratuita muestra anuncios mediante Google AdMob. AdMob puede recopilar y tratar datos como la ubicación aproximada inferida a partir de la dirección IP, las interacciones con la aplicación, datos de diagnóstico, información del dispositivo y los identificadores del dispositivo o de publicidad. Puede compartir o usar estos datos para publicidad, análisis y prevención de fraude. Los datos se cifran en tránsito.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Si usted está en el Espacio Económico Europeo o el Reino Unido, la aplicación muestra el formulario de consentimiento de Google (UMP) antes de solicitar anuncios. Puede cambiar su elección desde las opciones de privacidad disponibles en la aplicación, cuando estén disponibles.',
              ],
            },
            {
              type: 'p',
              parts: ['La aplicación no está dirigida a niños.'],
            },
            {
              type: 'p',
              parts: [
                'Puede restablecer o desactivar el identificador de publicidad en los ajustes de Android (Google, Anuncios).',
              ],
            },
            {
              type: 'p',
              parts: ['Más información: ', googlePartner, ' y ', googlePrivacy, '.'],
            },
          ],
        },
        {
          heading: '3. Compras dentro de la aplicación',
          blocks: [
            {
              type: 'p',
              parts: [
                'La compra única del producto remove_ads («Quitar anuncios») la procesa Google Play. El desarrollador no recibe ni guarda el número de su tarjeta ni los datos de su cuenta de pago. Google nos informa únicamente si la compra se realizó, para poder quitar los anuncios y restaurarla si usted reinstala la aplicación.',
              ],
            },
          ],
        },
        {
          heading: '4. Información que no recopilamos',
          blocks: [
            {
              type: 'p',
              parts: [
                'No recopilamos directamente su nombre, correo, contactos, ubicación precisa, fotos ni micrófono. La aplicación no tiene cuentas de usuario. Google AdMob puede tratar los datos descritos en la sección 2 para sus propios fines de publicidad, análisis y prevención de fraude.',
              ],
            },
          ],
        },
        {
          heading: '5. Menores de edad',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación está dirigida al público general y no está dirigida a niños. No recopilamos a sabiendas datos personales de niños. Si usted cree que un niño nos proporcionó información, contáctenos y la eliminaremos.',
              ],
            },
          ],
        },
        {
          heading: '6. Seguridad',
          blocks: [
            {
              type: 'p',
              parts: [
                'Los datos locales se guardan en el almacenamiento privado de la aplicación, al que otras aplicaciones no pueden acceder. Los datos de AdMob se cifran en tránsito. Ningún método de almacenamiento o transmisión es 100 % seguro, pero aplicamos medidas razonables.',
              ],
            },
          ],
        },
        {
          heading: '7. Sus derechos',
          blocks: [
            {
              type: 'p',
              parts: [
                'Como no tenemos sus datos de práctica en nuestros servidores, usted puede ejercer el control directamente: borrar los datos de la aplicación desde los ajustes de Android o desinstalarla. Para los datos de publicidad, use las opciones de privacidad de la aplicación o los ajustes de anuncios de Google.',
              ],
            },
          ],
        },
        {
          heading: '8. Cambios de esta política',
          blocks: [
            {
              type: 'p',
              parts: [
                'Podemos actualizar esta política. Publicaremos la versión nueva en esta página con su fecha de actualización.',
              ],
            },
          ],
        },
        {
          heading: '9. Contacto',
          blocks: [
            {
              type: 'p',
              parts: ['Si tiene preguntas sobre esta política, escríbanos a ', contactEmail, '.'],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'grabadora',
    name: 'Quitar silencios de audio',
    summary: 'Graba voz en el dispositivo y quita los silencios de las grabaciones WAV.',
    platform: 'Android',
    status: 'no-publicada',
    packageId: 'com.hectormezalab.grabadora',
    privacy: {
      lead: 'Esta política explica cómo la aplicación Quitar silencios de audio (paquete com.hectormezalab.grabadora), desarrollada por HectorMezaLab («nosotros»), trata la información cuando usted la usa.',
      sections: [
        {
          heading: 'Resumen',
          blocks: [
            {
              type: 'ul',
              items: [
                'No hay cuentas ni inicio de sesión. No se solicitan el nombre ni el correo electrónico.',
                'El micrófono graba audio solo cuando usted toca Grabar. Las grabaciones WAV se procesan para quitar silencios y se guardan solo en el almacenamiento del dispositivo. Nunca se envían a un servidor nuestro. La aplicación no tiene un servidor propio.',
                'La aplicación muestra anuncios de banner e intersticial con Google AdMob.',
                'Usted puede quitar los anuncios con la compra única remove_ads («Quitar anuncios»), procesada por Google Play.',
              ],
            },
          ],
        },
        {
          heading: '1. Micrófono (RECORD_AUDIO)',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación graba audio solo cuando usted toca Grabar. Puede seguir grabando en segundo plano o con la pantalla bloqueada mediante un servicio en primer plano, con una notificación «Grabando.» y un botón Detener.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Las grabaciones, en formato WAV, se procesan para quitar silencios y se guardan solo en el almacenamiento del dispositivo. Nunca se envían a un servidor nuestro. La aplicación no tiene un servidor propio.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Usted puede compartir un archivo WAV con otras aplicaciones, pero solo si usted decide hacerlo con el botón Compartir. Puede eliminar las grabaciones desde la biblioteca.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Los ajustes (sensibilidad, etc.) se guardan localmente.',
              ],
            },
          ],
        },
        {
          heading: '2. Notificaciones (POST_NOTIFICATIONS)',
          blocks: [
            {
              type: 'p',
              parts: [
                'El permiso de notificaciones se usa solo para la notificación de grabación en curso.',
              ],
            },
          ],
        },
        {
          heading: '3. Cuentas',
          blocks: [
            {
              type: 'p',
              parts: [
                'No hay cuentas ni inicio de sesión. No se solicitan el nombre ni el correo electrónico.',
              ],
            },
          ],
        },
        {
          heading: '4. Anuncios (Google AdMob)',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación muestra anuncios de banner e intersticial con Google AdMob, mediante el SDK de Google Mobile Ads. Según la ',
                {
                  href: 'https://developers.google.com/admob/android/privacy/play-data-disclosure',
                  label: 'guía oficial de Google sobre la divulgación de datos de ese SDK en Google Play',
                },
                ', el SDK recoge y comparte lo siguiente:',
              ],
            },
            {
              type: 'ul',
              items: [
                'Dirección IP, que puede utilizarse para estimar la ubicación aproximada.',
                'Interacciones con el producto: inicios de la aplicación, toques y vistas de anuncios.',
                'Información de diagnóstico: fallas y rendimiento.',
                'Identificadores de dispositivo o de cuenta: el ID de publicidad de Android y el App Set ID.',
              ],
            },
            {
              type: 'p',
              parts: [
                'Esos datos se tratan con fines de publicidad, estadísticas y prevención de fraude. Viajan cifrados mediante TLS.',
              ],
            },
            {
              type: 'p',
              parts: [
                'El tratamiento que realiza Google se describe en su ',
                { href: 'https://policies.google.com/privacy', label: 'política de privacidad' },
                ' y en la página sobre ',
                {
                  href: 'https://policies.google.com/technologies/partner-sites',
                  label: 'cómo usa Google los datos de las aplicaciones de sus socios',
                },
                '.',
              ],
            },
          ],
        },
        {
          heading: '5. ID de publicidad',
          blocks: [
            {
              type: 'p',
              parts: [
                'Usted puede restablecer o eliminar su ID de publicidad y desactivar la personalización de anuncios desde los ajustes de Android, en Google > Anuncios. El nombre de esas opciones puede variar según la versión del sistema.',
              ],
            },
          ],
        },
        {
          heading: '6. Consentimiento',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación usa la plataforma de mensajes de Google (UMP) para el GDPR (Espacio Económico Europeo y Reino Unido) y para las leyes de privacidad de estados de Estados Unidos, antes de pedir anuncios. Si UMP lo exige, Ajustes muestra «Privacidad de anuncios» para cambiar la elección.',
              ],
            },
          ],
        },
        {
          heading: '7. Compras dentro de la aplicación',
          blocks: [
            {
              type: 'p',
              parts: [
                'La compra única del producto remove_ads («Quitar anuncios») la procesa Google Play. No recibimos los datos de pago. Google solo informa si la compra existe, y ese estado se guarda localmente para restaurarla. Con la compra activa no se cargan anuncios.',
              ],
            },
          ],
        },
        {
          heading: '8. Menores de edad',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación está dirigida al público general y no está dirigida a niños. No recopilamos a sabiendas datos personales de niños. Si usted cree que un niño nos proporcionó información, contáctenos y la eliminaremos.',
              ],
            },
          ],
        },
        {
          heading: '9. Seguridad',
          blocks: [
            {
              type: 'p',
              parts: [
                'Las grabaciones y los ajustes se guardan solo en el almacenamiento del dispositivo. Nunca se envían a un servidor nuestro. La aplicación no tiene un servidor propio. Los datos que el SDK de Google Mobile Ads transmite a Google viajan cifrados mediante TLS.',
              ],
            },
          ],
        },
        {
          heading: '10. Sus derechos',
          blocks: [
            {
              type: 'p',
              parts: [
                'Como las grabaciones no se envían a un servidor nuestro, usted puede ejercer el control directamente: eliminar las grabaciones desde la biblioteca, borrar los datos de la aplicación desde los ajustes de Android o desinstalarla.',
              ],
            },
          ],
        },
        {
          heading: '11. Cambios de esta política',
          blocks: [
            {
              type: 'p',
              parts: [
                'Podemos actualizar esta política. Publicaremos la versión nueva en esta página con su fecha de actualización.',
              ],
            },
          ],
        },
        {
          heading: '12. Contacto',
          blocks: [
            {
              type: 'p',
              parts: ['Si tiene preguntas sobre esta política, escríbanos a ', contactEmail, '.'],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'escuchar-audiolibros',
    name: 'Escuchar Audiolibros',
    summary:
      'Reproductor local de audiolibros. Reproduce archivos de audio del dispositivo, organiza la biblioteca y sigue desde donde se dejó. No pide cuenta ni muestra publicidad.',
    platform: 'Android',
    status: 'publicada',
    packageId: 'com.soyache.audiobooks',
    playUrl: 'https://play.google.com/store/apps/details?id=com.soyache.audiobooks',
    cardNote: 'Los archivos se quedan en el dispositivo. Funciona sin conexión.',
    steps: [
      'Reproduce archivos de audio que ya están en el dispositivo.',
      'Organiza la biblioteca para encontrar los títulos.',
      'La reproducción continúa desde donde se dejó.',
    ],
  },
  {
    slug: 'gasto-de-comida',
    name: 'Gasto de Comida',
    summary:
      'Registra desayuno, almuerzo y cena, y anota abonos para bajar el saldo. Los precios, la moneda y los movimientos se guardan en el teléfono.',
    platform: 'Android',
    status: 'publicada',
    packageId: 'com.hectormeza.comidas',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hectormeza.comidas',
    cardNote: 'Sin anuncios y sin cuenta.',
    steps: [
      'Registra la comida de esta hora. La aplicación elige desayuno, almuerzo o cena según la hora.',
      'Anota comidas de otros días, con cantidad y una nota si hace falta.',
      'Registra abonos para bajar el saldo. Los precios y la moneda se cambian en la configuración.',
      'El widget de inicio guarda la comida de la hora actual en el mismo registro local.',
    ],
    privacyUpdated: '8 de octubre de 2026',
    privacy: {
      lead: 'Esta política explica cómo la aplicación Gasto de Comida (paquete com.hectormeza.comidas), desarrollada por HectorMezaLab («nosotros»), trata la información cuando usted la usa.',
      sections: [
        {
          heading: 'Resumen',
          blocks: [
            {
              type: 'ul',
              items: [
                'No hay cuentas ni inicio de sesión. No se piden el nombre ni el correo.',
                'Las comidas, los abonos, los precios, la moneda y las notas se guardan en una base SQLite del dispositivo (comidas_app.db). La aplicación no tiene un servidor propio.',
                'El manifiesto no declara permiso de Internet ni incluye un SDK de anuncios, de analítica ni de Firebase.',
                'La tipografía Plus Jakarta Sans se pide al proveedor de fuentes de los servicios de Google Play en el dispositivo.',
              ],
            },
          ],
        },
        {
          heading: '1. Información que se guarda en el dispositivo',
          blocks: [
            {
              type: 'p',
              parts: [
                'La base local guarda movimientos de comida y de abono (monto, fecha, tipo de comida, cantidad y una nota opcional), los precios de desayuno, almuerzo y cena, las monedas personalizadas y ajustes de la aplicación.',
              ],
            },
            {
              type: 'p',
              parts: [
                'El widget de inicio registra la comida que corresponde a la hora actual y la escribe en esa misma base. Puede borrar movimientos desde la aplicación. Los datos locales se borran si usted desinstala la aplicación o borra sus datos desde los ajustes de Android.',
              ],
            },
          ],
        },
        {
          heading: '2. Lo que la aplicación no envía',
          blocks: [
            {
              type: 'p',
              parts: [
                'El manifiesto no declara permisos. No hay permiso de Internet, de ubicación, de contactos, de micrófono ni de fotos. En las dependencias del proyecto no hay SDK de anuncios, de analítica ni de Firebase. Nosotros no recibimos las comidas, los montos ni las notas en un servidor.',
              ],
            },
          ],
        },
        {
          heading: '3. Fuentes en el dispositivo',
          blocks: [
            {
              type: 'p',
              parts: [
                'La interfaz usa la fuente Plus Jakarta Sans a través del proveedor de fuentes de los servicios de Google Play (com.google.android.gms.fonts). Esa petición la atiende el proveedor de fuentes del dispositivo. No incluye las comidas, los montos ni las notas.',
              ],
            },
          ],
        },
        {
          heading: '4. Copia de seguridad de Android',
          blocks: [
            {
              type: 'p',
              parts: [
                'El manifiesto deja allowBackup en true. Los archivos de reglas de copia (backup_rules.xml y data_extraction_rules.xml) son la plantilla vacía del proyecto de Android: no declaran inclusiones ni exclusiones propias. Si el sistema hace una copia de la aplicación, esa copia la gestiona Android con la cuenta del dispositivo, no un servidor de HectorMezaLab.',
              ],
            },
          ],
        },
        {
          heading: '5. Menores de edad',
          blocks: [
            {
              type: 'p',
              parts: [
                'La aplicación está dirigida al público general y no está diseñada específicamente para niños menores de 13 años. No recopilamos a sabiendas datos personales de niños. Si usted cree que un niño nos proporcionó información, contáctenos y la eliminaremos.',
              ],
            },
          ],
        },
        {
          heading: '6. Sus derechos',
          blocks: [
            {
              type: 'p',
              parts: [
                'Como no tenemos sus movimientos en nuestros servidores, usted puede ejercer el control directamente: borrar registros en la aplicación, borrar los datos de la aplicación desde los ajustes de Android o desinstalarla.',
              ],
            },
          ],
        },
        {
          heading: '7. Cambios de esta política',
          blocks: [
            {
              type: 'p',
              parts: [
                'Podemos actualizar esta política. Publicaremos la versión nueva en esta página con su fecha de actualización.',
              ],
            },
          ],
        },
        {
          heading: '8. Contacto',
          blocks: [
            {
              type: 'p',
              parts: ['Si tiene preguntas sobre esta política, escríbanos a ', contactEmail, '.'],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'cuota-prestamo',
    name: 'Cuota Préstamo',
    summary:
      'Calcula cuotas niveladas de un préstamo. La ficha en Google Play dice que la interfaz no muestra anuncios que estorben el uso.',
    platform: 'Android',
    status: 'publicada',
    packageId: 'com.hectormeza.cuotaprestamos',
    playUrl: 'https://play.google.com/store/apps/details?id=com.hectormeza.cuotaprestamos',
  },
  {
    slug: 'paynyk',
    name: 'Paynyk',
    summary:
      'Punto de venta para negocios. Hay instalador público para Windows y APK para Android. Al abrir el programa se ingresa un código de activación.',
    platform: 'Windows y Android',
    status: 'negocio',
    downloadUrl: 'https://github.com/soyache/payly-releases/releases/latest',
    downloadLabel: 'Instaladores',
    contact: {
      href: 'https://wa.me/50433909896',
      label: 'WhatsApp +504 3390-9896',
    },
  },
  {
    slug: 'bokey',
    name: 'Bokey',
    summary:
      'Walkie de un canal: se mantiene el botón para hablar y se suelta para escuchar. Hay lista de personas en el canal. El APK se instala desde las releases públicas.',
    platform: 'Android',
    status: 'descarga',
    downloadUrl: 'https://github.com/soyache/bokey-releases/releases/latest',
    downloadLabel: 'Descargar APK',
  },
];

export function unpublishedNote(status: AppRecord['status']) {
  if (status === 'prueba') return 'En prueba cerrada. Todavía no está publicada en Google Play.';
  if (status === 'no-publicada') return 'Todavía no está publicada en Google Play.';
  return undefined;
}

export function hasDetailPage(status: AppRecord['status']) {
  return status === 'publicada' || status === 'descarga' || status === 'negocio';
}

export function statusLabel(status: AppRecord['status']) {
  switch (status) {
    case 'publicada':
      return 'En Google Play';
    case 'prueba':
      return 'En prueba';
    case 'no-publicada':
      return 'Sin publicar';
    case 'descarga':
      return 'Descarga directa';
    case 'negocio':
      return 'Software para negocios';
  }
}

export function catalogAnchor(status: AppRecord['status']) {
  if (status === 'negocio') return '/#negocios';
  if (status === 'descarga') return '/#descargas';
  return '/#apps';
}

export type CatalogSection = {
  id: string;
  title: string;
  countLabel: string;
  apps: AppRecord[];
};

function countLabel(count: number, one: string, many: string) {
  return count === 1 ? `1 ${one}` : `${count} ${many}`;
}

export function catalogSections(): CatalogSection[] {
  const byStatus = (status: AppRecord['status']) => apps.filter((app) => app.status === status);
  const play = byStatus('publicada');
  const negocio = byStatus('negocio');
  const descarga = byStatus('descarga');
  const sections: CatalogSection[] = [
    {
      id: 'apps',
      title: 'Apps Android en Google Play',
      countLabel: countLabel(play.length, 'en Google Play', 'en Google Play'),
      apps: play,
    },
    {
      id: 'negocios',
      title: 'Software para negocios',
      countLabel: countLabel(negocio.length, 'programa', 'programas'),
      apps: negocio,
    },
    {
      id: 'descargas',
      title: 'Descarga directa',
      countLabel: countLabel(descarga.length, 'descarga', 'descargas'),
      apps: descarga,
    },
  ];
  return sections.filter((section) => section.apps.length > 0);
}

export function getApp(slug: string) {
  return apps.find((app) => app.slug === slug);
}

export function isDocumentPrivacy(privacy: AppRecord['privacy']): privacy is DocumentPrivacy {
  return !!privacy && 'sections' in privacy;
}
