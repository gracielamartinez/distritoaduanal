# Distrito Aduanal — sitio web

Sitio web de seis páginas (Inicio, Servicios, Foro, Preguntas frecuentes,
Cobertura y Nosotros) para una agencia aduanal y comercializadora.
Construido en React puro, sin paso de compilación: el navegador carga React
directamente desde un CDN (esm.sh) como módulos ES, así que no se necesita
Node.js, npm ni un bundler para ejecutarlo.

Buena parte del contenido (contacto, redes, cifras, catálogo de servicios,
preguntas frecuentes) se puede editar sin tocar código desde un panel en
`/admin` — ver la sección **Editar el contenido desde /admin** más abajo.

## Cómo verlo en tu computadora

Primero se genera la carpeta `dist/` (una página por sección y por artículo
del blog, igual que en Netlify) y luego se sirve:

```bash
python3 scripts/build.py && python3 -m http.server 8420 -d dist
```

Y abre http://localhost:8420 en el navegador. Si cambias algo, vuelve a
correr el primer comando.

No abras `index.html` directamente con doble clic (`file://`) — los módulos
ES y el mapa de importaciones necesitan que el sitio se sirva por `http://`.
El panel `/admin` solo funciona una vez publicado en Netlify (ver abajo);
en local siempre muestra la pantalla de login sin poder entrar.

## Estructura

```
index.html          # Punto de entrada, carga React desde CDN vía importmap
styles.css           # Todo el CSS del sitio (colores, tipografía, layout responsivo)
netlify.toml         # Le dice a Netlify que corra scripts/build.py y publique dist/
scripts/build.py     # Genera dist/: una página por URL con su título y descripción, sitemap.xml y robots.txt
admin/
├── index.html        # Carga el editor Decap CMS (sin instalar nada)
└── config.yml         # Define qué campos son editables desde /admin
content/
├── site.json          # Contacto, redes sociales, cifras y reseña — editable desde /admin
├── services.json       # Catálogo de servicios por área — editable desde /admin
└── faq.json            # Preguntas frecuentes por categoría — editable desde /admin
assets/
├── logo.png            # Logo real (texto azul marino) — usado como favicon
└── logo-dark.png       # Logo real (texto blanco) — usado en header y footer, sobre fondo oscuro
src/
├── config.js         # Valores por defecto de contacto (respaldo si content/site.json no carga)
├── icons.js           # Íconos SVG reutilizables
├── router.js          # Enrutador con URLs reales (/blog/mi-articulo/), sin dependencias
├── seo.js             # Actualiza título y descripción al navegar (datos en content/pages.json)
├── App.js             # Layout general (header + página + footer) y mapa de rutas
├── main.js            # Carga content/*.json y luego monta la app en el DOM
├── data/
│   ├── services.js     # Catálogo de servicios por defecto (respaldo de content/services.json)
│   └── faq.js           # Preguntas frecuentes por defecto (respaldo de content/faq.json)
├── components/
│   ├── Header.js       # Barra superior, navegación, menú móvil
│   ├── Footer.js       # Pie de página
│   ├── SocialLinks.js  # Íconos de Facebook, Instagram, WhatsApp y correo
│   ├── WhatsAppButton.js  # Botón flotante de WhatsApp
│   ├── QuoteForm.js    # Formulario reutilizable (abre WhatsApp con el mensaje armado)
│   └── Accordion.js    # Acordeón usado en la página de preguntas frecuentes
└── pages/
    ├── Home.js               # Página de inicio
    ├── Servicios.js           # Catálogo completo de servicios por área, con íconos
    ├── PreguntasFrecuentes.js # FAQ del manual del cliente, en acordeón
    ├── Foro.js                # Temas más comentados + formulario para preguntas nuevas
    └── Nosotros.js            # Historia real, misión, visión y propuesta de valor
```

## Editar el contenido desde /admin

El sitio lee su contenido de tres archivos en `content/` (contacto y redes,
catálogo de servicios, preguntas frecuentes). El panel en `tudominio.com/admin`
permite editar esos archivos con formularios simples, sin tocar código —
cada guardado actualiza el sitio automáticamente en uno o dos minutos.

**Cómo entrar:** abre `tudominio.com/admin`, inicia sesión con el correo que
se invitó desde Netlify Identity (ver checklist de publicación abajo), y
edita cualquiera de las tres colecciones: **Datos generales**, **Catálogo de
servicios** o **Preguntas frecuentes**.

**Qué NO se edita desde ahí:** el diseño, los textos largos de las páginas
(Nosotros, la introducción de Servicios, etc.) y la estructura de las
páginas — eso sigue viviendo en el código, en `src/`.

## Qué editar antes de publicar

**1. Cifras y reseña pendientes** — en el panel `/admin`, colección **Datos
generales**: años de experiencia, operaciones realizadas, aduanas, sectores
atendidos, y la reseña destacada. Aparecen resaltadas en verde en el sitio
mientras estén vacías — son placeholders a propósito, no se inventaron cifras
ni testimonios.

**2. Una respuesta pendiente** — en el panel `/admin`, colección **Preguntas
frecuentes**, la pregunta "¿Por qué están elevados los impuestos?" no tiene
respuesta todavía (venía así en el manual original).

**3. El formulario de contacto** no tiene backend: arma un mensaje y abre
WhatsApp con el chat listo para enviar (ver [`src/components/QuoteForm.js`](src/components/QuoteForm.js)
y, en el Foro, [`src/pages/Foro.js`](src/pages/Foro.js)). El foro no publica
preguntas en un tablero público — cada envío llega directo al equipo por
WhatsApp, y el sitio lo deja claro en el texto del formulario.

## Publicarlo en internet (Netlify + edición desde /admin)

El sitio ya está preparado en un repositorio Git local, listo para subir a
GitHub y conectar con Netlify. Esto da hosting gratis, HTTPS automático, y el
panel `/admin` funcionando (cada guardado ahí hace commit al repositorio y
Netlify vuelve a publicar solo).

**Checklist para dejarlo en línea:**

1. Crear un repositorio vacío en GitHub (sin README, sin licencia) y avisar la
   URL para conectarlo aquí (`git remote add origin <url>` y `git push -u
   origin main`).
2. En [app.netlify.com](https://app.netlify.com): **Add new site → Import an
   existing project → GitHub**, elegir el repositorio. Netlify detecta
   `netlify.toml` solo — no hace falta configurar build command ni publish
   directory (el build solo usa Python, que ya viene en Netlify).
3. En el sitio ya creado, ir a **Site configuration → Identity → Enable
   Identity**.
4. En **Identity → Services**, activar **Git Gateway**.
5. En **Identity → Invite users**, invitar el correo con el que se va a
   entrar a `/admin` (llega un correo para poner contraseña).
6. Abrir `tudominio.netlify.app/admin`, iniciar sesión, y ya se puede editar.

Las URLs son reales (`/blog/mi-articulo/`, no `#/blog/mi-articulo`) para que
Google indexe cada página por separado. Funcionan porque `scripts/build.py`
crea un archivo por URL; en otro hosting habría que subir la carpeta `dist/`
ya generada. Los enlaces viejos con `#/` se redirigen solos a la URL nueva.

Cuando se conecte el dominio distritoaduanal.com y se marque como dominio
principal en Netlify, las URLs canónicas, el sitemap y robots.txt pasan a usarlo
en la siguiente publicación, sin cambiar código.

## Si más adelante instalan Node.js

Este sitio se escribió sin paso de compilación porque esta máquina no tiene
Node instalado. Si lo instalan después, se puede migrar a un proyecto Vite
normal (`npm create vite@latest`) para tener recarga en caliente, TypeScript,
optimización de imágenes, etc. — el código de `src/` es React estándar y se
traslada con cambios mínimos.
