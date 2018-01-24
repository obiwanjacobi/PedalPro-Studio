# TODO Task List

## Project Setup

- Post processing build (copy content files into app folder)
- Hot Reload in Electron
- Electron Builder/Packager (deployment)

## Libraries

import Document, { Head, Main, NextScript } from 'next/document';


// material-ui
http://google.github.io/material-design-icons/#icon-font-for-the-web
https://www.npmjs.com/package/material-ui-bottom-sheet

// layout
https://github.com/byronmwong/react-flexbox-layout
https://github.com/rofrischmann/react-layout-components
https://reactjsexample.com/tag/layout/
https://github.com/monvillalon/react-page-layout
https://github.com/tstringer/electron-basic-ui-layout
https://github.com/tstringer/electron-flexbox-ui-layout
https://github.com/zesik/react-splitter-layout
https://github.com/musyoka-morris/react-pure-grid

Abandoned proptypes-from-react-depricated: https://www.npmjs.com/package/react-flex-layout
Does not work: https://github.com/tomkp/react-split-pane

// redux middleware
https://github.com/redux-saga/redux-saga
https://github.com/reactjs/redux/tree/master/examples/async

efficient algorithm for creating new immutable state objects.
https://www.npmjs.com/package/immutable-assign

Typed actions for redux
https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
https://www.npmjs.com/package/redux-typed-actions

TypeScript and redux (tutorial)
https://github.com/ServiceStackApps/typescript-redux
http://www.mattgreer.org/articles/typescript-react-and-redux/
https://github.com/piotrwitek/react-redux-typescript-guide
https://egghead.io/lessons/javascript-redux-simplifying-the-arrow-functions

Routing react/redux
https://github.com/ReactTraining/react-router
https://github.com/acdlite/redux-router
https://github.com/reactjs/react-router-redux

React/Redux selectors
https://github.com/reactjs/reselect

Electron
https://github.com/MarshallOfSound/electron-devtools-installer

TypeScript
https://github.com/Microsoft/tslib

## Code

- Fix shared Model between server and client.
- react-redux connect method: investigate
- dense on List does not work when a checkbox is in ListItem
    https://github.com/mui-org/material-ui/issues/9274
- Vertical Scrollbars wrong on tabs. (Split)Pane is too big and runs behind the tabs-control.
- reorderable/drag&drop list: https://gist.github.com/jlroettger/2d6d7ae572f985fa176c27a63cadf292

## Preset List

 - drag & drop (react-sortable-hoc)
 - undo preset name text should change to redo when history.name is restored. redo will then simply copy in the current preset name.
 - scolling   https://github.com/kristoferjoseph/flexboxgrid

 Based on the device identification a shadow file/folder is maintained that stores all the preset's extra (meta) data.
 Device Presets are to be matched by either name and/or index to the files (user could have edited presets on the device). 
 All device presets are automatically saved when uploaded to the device.

## performance

- Done: remove/refactor all anonymous event handlers (start with PresetList/Item) - bind in ctor.
- add tslib
- use a virtual preset list: https://github.com/bvaughn/react-virtualized
- look into state management
- Done: implement ShouldComponentUpdate()
- Redux connect at list item level. Bind list with number of presets and instantiate each list item with its index.
    How will this work with filtering? Filtering is done at list-level and a ListItem is instantiated for each preset index.
- Use production build of React. Have no idea how to change that in electron/ts.
- use a pack tool (webpack/babel/rollup) to optimize startup time (which is also pretty bad)

react: https://medium.com/@arikmaor/react-redux-performance-tuning-tips-cef1a6c50759
https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3

