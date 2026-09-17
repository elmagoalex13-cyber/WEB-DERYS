# Rutas de imagenes

La web acepta archivos sin extension y estos formatos para cada imagen:

- sin extension, por ejemplo `home-avatar`
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`
- `.gif`
- `.svg`

Mantén el nombre base y cambia solo la extensión. Por ejemplo, para la imagen de Twitter puedes usar cualquiera de estos:

- `assets/images/twitter`
- `assets/images/twitter.jpg`
- `assets/images/twitter.jpeg`
- `assets/images/twitter.png`
- `assets/images/twitter.webp`

Nombres base que usa la web:

- `home-avatar`: foto circular de la home.
- `hero`: foto grande superior de `links.html`.
- `onlyfans`: imagen de la tarjeta principal de OnlyFans.
- `twitter`: imagen de la tarjeta de Twitter/X.
- `instagram`: imagen de la tarjeta de Instagram.
- `onlyfans-logo`: logo de OnlyFans.

La web probará automáticamente las extensiones disponibles. Si existen varias con el mismo nombre base, usa la primera en este orden: sin extension, `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`, `svg`.

Recomendacion: aunque la web acepta archivos sin extension, para subirla a hosting es mas fiable usar extension (`.jpg`, `.png`, `.webp`, etc.).
