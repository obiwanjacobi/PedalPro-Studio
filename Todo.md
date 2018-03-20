# TODO Task List

## Project Setup

- Hot Reload in Electron
- minify webpack output for prod

## PedalProDevice

- [Done] Recreate HID object on write error - connection may have been interrupted.
- [Done] Allow filtering on index (numerical input & ranges using - or :)
- [Done] Change the way a preset is moved in the list to allow for index-gaps (where empty presets have been filtered out).
- [Done] Reverse engineer .vrf binary files to be able to read in old PedalManager files (Java).

## Code

- [Will not] Fix shared Model between server and client.
- [Done] react-redux connect method: investigate
- dense on List does not work when a checkbox is in ListItem https://github.com/mui-org/material-ui/issues/9274
- [Fixed] Vertical Scrollbars wrong on tabs. (Split)Pane is too big and runs behind the tabs-control.
- reorderable/drag&drop list: https://gist.github.com/jlroettger/2d6d7ae572f985fa176c27a63cadf292

## Bugs

- [Fixed] Convert.toLogDB yields wrong results. Range is not linear.

## Preset List

- drag & drop (react-sortable-hoc)
- undo preset name text should change to redo when history.name is restored. redo will then simply copy in the current preset name.

Based on the device identification a shadow file/folder is maintained that stores all the preset's extra (meta) data.
Device Presets are to be matched by either name and/or index to the files (user could have edited presets on the device).
All device presets are automatically saved when uploaded to the device.

## performance

- [Done] remove/refactor all anonymous event handlers (start with PresetList/Item) - bind in ctor.
- add tslib
- [Done] use a virtual preset list: https://github.com/bvaughn/react-virtualized
- look into state management
- [Done] implement ShouldComponentUpdate()
- Redux connect at list item level. Bind list with number of presets and instantiate each list item with its index.
    How will this work with filtering? Filtering is done at list-level and a ListItem is instantiated for each preset index.
- [Done] Use production build of React. Have no idea how to change that in electron/ts.
- [Done] use a pack tool (webpack/babel/rollup) to optimize startup time (which is also pretty bad)
    http://blog.scottlogic.com/2017/06/06/typescript-electron-webpack.html

react: https://medium.com/@arikmaor/react-redux-performance-tuning-tips-cef1a6c50759
https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3

## Libraries

import Document, { Head, Main, NextScript } from 'next/document';

https://github.com/brillout/awesome-react-components

// material-ui
https://github.com/react-toolbox/react-toolbox/issues/1057#issuecomment-371335234
http://google.github.io/material-design-icons/#icon-font-for-the-web
https://www.npmjs.com/package/material-ui-bottom-sheet

// redux middleware
https://github.com/redux-saga/redux-saga
https://github.com/reactjs/redux/tree/master/examples/async

Immutable state objects.
https://www.npmjs.com/package/immutable-assign

Typed actions for redux
https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
https://www.npmjs.com/package/redux-typed-actions

TypeScript and redux (tutorial)
https://github.com/ServiceStackApps/typescript-redux
http://www.mattgreer.org/articles/typescript-react-and-redux/
https://github.com/piotrwitek/react-redux-typescript-guide
https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions

React/Redux selectors
https://github.com/reactjs/reselect

Electron
https://github.com/MarshallOfSound/electron-devtools-installer
https://anadea.info/blog/building-desktop-app-with-electron

TypeScript
https://github.com/Microsoft/tslib
