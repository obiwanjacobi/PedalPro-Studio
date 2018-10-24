# Release Manual

Execute these steps to build a new release.

- Set version number
- Change source code.
- Perform (`npm`) build steps.

## `index.html`

```html
<title>PedalPro Studio - v?.?.?</title>
```

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
- `"version": "?.?.?"`

## _npm_

- `npm run build:prod` -or- 
  - `npm run build:prod:prog`
  - `npm run build:prod:app`
- `npm run build:native` (optional)
- `npm run release`
