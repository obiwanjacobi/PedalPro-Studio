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

- from `"main": "./app/Startup.js"` to `"main": "./app/prog.js"`
- `"version": "?.?.?"`

## _npm_

- `npm install`
- `npm run build:prod:prog`
- `npm run build:prod:app`
- `npm run release`

## Mac

Do **not** run any of the npm commands under `sudo`.

This should fix any access errors:
`sudo chown -R $USER:$(id -gn $USER) /Users/marc/.config`

## Linux

Do **not** run any of the npm commands under `sudo`.

Run `export NODE_OPTIONS=--max_old_space_size=4096` (4GB) before running `npm run build:prod:app` or it may give an out-of-memory error.

If `npm run release` fails with *libudev.h: No such file or directory* run `sudo apt-get install libudev-dev`