# Release Manual

Execute these steps to build a new release.

- Change source code.
- Perform (`npm`) build steps.

## `index.html`

from

```html
  <script>require("../app/Autostart.js");</script>
  <!-- <script src="../app/app.js"></script> -->
```

to

```html
  <!-- <script>require("../app/Autostart.js");</script> -->
  <script src="../app/app.js"></script>
```

## `package.json`

- from `"main": "./app/Startup.js"` to `"main": "./app/program.js"`

## _npm_

- `npm run build:production`
- `npm run build:native`
- `npm run release`
