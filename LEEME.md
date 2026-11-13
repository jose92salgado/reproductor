# Mi Reproductor (app instalable para iPhone)

App web instalable (PWA): se añade a la pantalla de inicio del iPhone y se abre como una app,
con su icono y a pantalla completa.

- **Mi música**: importa MP3, M4A, WAV… desde la app Archivos o iCloud Drive. Se guardan en el
  iPhone, funcionan sin internet y se controlan desde la pantalla bloqueada.
- **Audius**: música gratis de artistas independientes, **sin anuncios** y sin clave. Sigue sonando con
  la pantalla bloqueada y se controla desde el Centro de control. Al abrirla muestra las canciones en
  tendencia, y puedes buscar por artista o canción. Necesita internet.
- **YouTube**: busca canciones y las reproduce con el reproductor oficial de YouTube. Puede mostrar
  anuncios, salvo que tengas YouTube Premium y hayas iniciado sesión en youtube.com desde Safari.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` | Nombre, icono y modo pantalla completa al instalarla |
| `sw.js` | Guarda la app para que abra sin conexión |
| `icons/` | Iconos de la app |

## 1. Publicarla en internet (gratis, con GitHub Pages)

El iPhone solo puede instalar la app desde una dirección `https://`.

1. Crea una cuenta en https://github.com si no tienes una.
2. Pulsa **New repository**, ponle un nombre (por ejemplo `reproductor`), márcalo como **Public** y créalo.
3. En el repositorio, pulsa **Add file → Upload files** y arrastra **todo el contenido** de esta carpeta
   (`index.html`, `manifest.webmanifest`, `sw.js` y la carpeta `icons`). Pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En *Branch* elige `main` y la carpeta `/ (root)`, y pulsa **Save**.
5. En uno o dos minutos tendrás la dirección: `https://TU-USUARIO.github.io/reproductor/`

También sirve Netlify Drop (https://app.netlify.com/drop): arrastras la carpeta y te da una dirección al instante.

## 2. Instalarla en el iPhone

1. Abre la dirección en **Safari**. Chrome no permite instalarla en iPhone.
2. Toca **Compartir** (el cuadrado con la flecha hacia arriba).
3. Toca **Añadir a pantalla de inicio** y luego **Añadir**.

## 3. Crear la clave de YouTube (solo para la pestaña YouTube)

1. Entra en https://console.cloud.google.com con tu cuenta de Google.
2. Crea un proyecto nuevo (por ejemplo, "Reproductor").
3. Ve a **APIs y servicios → Biblioteca**, busca **YouTube Data API v3** y pulsa **Habilitar**.
4. Ve a **APIs y servicios → Credenciales → Crear credenciales → Clave de API**. Copia la clave (empieza por `AIza`).
5. **Protege la clave**: pulsa **Editar clave**.
   - En *Restricciones de aplicaciones* elige **Sitios web** y añade `https://TU-USUARIO.github.io/*`.
   - En *Restricciones de API* elige **YouTube Data API v3**.
   - Guarda los cambios.
6. En la app, abre la pestaña **YouTube**, pega la clave y pulsa **Guardar**.

La clave se guarda solo en tu iPhone; no está escrita en los archivos publicados.
El plan gratuito da 10 000 unidades al día. Cada búsqueda gasta 100, así que tienes unas **100 búsquedas diarias**.

## Límites del iPhone

- **YouTube no suena con la pantalla bloqueada ni en segundo plano.** Apple y YouTube no lo permiten
  en apps web; para eso hace falta YouTube Premium o la app oficial. Tus canciones de **Mi música**
  sí siguen sonando con la pantalla bloqueada.
- Algunos videos no se pueden reproducir fuera de YouTube porque su dueño lo prohíbe. La app avisa
  y pasa al siguiente.
- En iPhone el volumen se controla con los botones del teléfono.
- Si borras los datos de Safari o eliminas la app de la pantalla de inicio, se borran las canciones importadas.

## Publicar cambios

Si modificas `index.html`, sube la nueva versión. En `sw.js`, cambia `reproductor-v1` por
`reproductor-v2` (y así sucesivamente) para que el iPhone descargue la versión nueva.
