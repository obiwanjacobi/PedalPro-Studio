# PedalPro Studio - TODO

- Test if all settings values for all effects reflect the value range on the device.

## Release/Deployemnt Issues

- make Mac deployment https://www.techplustips.com/install-macos-mojave-virtualbox/

## TODO Task List

- [Done] change app name from 'PedalPro Editor' to 'PedalPro Studio'.
- [Done] create paste dialog to let user pick where to paste the copied presets (overwrite, insert at, first empty, or append to end).
- [Done] create storage tab, view and list. List is grouped by file name.
- [Done] move factory preset file for ex and find std factory presets.
- [Done] create FactoryProvider for PedalPro (Std)
- [Done] mark as delete (make empty) selected presets and single preset (expand box). Actually deleted (made empty) when uploaded.
- [Done] reverse engineer DSP type settings.
- [Done] Place a badge on the upload button with a count of flagged presets (device)
- [Done] For storage indicate flagged presets it on each bank.
- [Done] Storage Bank flag to indicate changes in the bank itself (rename)
- [Done] Implement Storage Bank delete.
- [Done] Implement delete storage presets toolbar button (all selected presets).
- [Done] Remove fireXxxx from PresetToolbar - use props.Xxxx directly
- [Done] Fix layout of move dialog
- [Done] Fix layout of paste dialogs (device/storage)
- drag & drop (react-sortable-hoc)
- undo preset name text should change to redo when history.name is restored. redo will then simply copy in the current preset name.
- Ask conformation before removing changed presets (delete, download).
- Implement Favorites for presets (requires PP/PPE protocol code).
- Add tooltip control that display text separate from control (status/tool/title bar)
- Add locallization, translated strings.
- Storage presets should be shown in the same order as the banks they belong to.
- PresetView should have sorting (byIndex, byName, asc/desc).
- Fix layout (padding) of notification popup.
- Paste Empty shows garbage-can (x) target in the preview list.

## Bugs

- Left panes in Storage (banks) and Edit Effects need to be limited in width (max-width).
- Move storage preset errors out when target index was deleted.
- Storage banks are only saved when they have presets.
- Device Presets do not have 'meta' set (undefined).
- Paste By Index may generate conflicts: multiple clipboard presets targeted at the same index.
- [Done] onClick / onChange handlers must check if value is 'on' before dispatching action.
    Replace onClick with onChange.
- [Fixed] use onClick not onChange on buttons.
- [Fixed] After selecting a preset and changing views (device/storage/factory) the view-filter for selection is not enabled anymore.
- [Fixed] Convert.toLogDB yields wrong results. Range is not linear.
- [Done] Refactor (Load/Save) Actions with error property. Simply dispatch an error-action when error is caught.
- [Fixed] Delete last storage bank does not remove it from display.
- [Fixed] Delete a non-created (uploaded) storage bank fails with message bank was not found.
- [Fixed] Delete storage preset leaves original. Deleted item show at start of list with original index. After upload state is restored as expected, but empty preset is saved to disk.
- [Fixed] Storage 'Select All' toolbar button does not show correct state when hand-selecting storage presets. Because of extra hidden empty preset?
- [Fixed] Delete Storage Bank should mark as deleted (now it deletes immediately).
- [Fixed] Duplicate bank names ('new') causes problems and mixups.
- [Fixed] Copying storage presets between banks (new/new2) deletes one bank (thinks its a bank-rename).
- [Fixed] After storage upload, banks are not reloaded and old ui shows.
- [Fixed] Delete Storage Preset of non-created bank gives error (cannot find the file).
- [Fixed] New Storage banks are double when uploaded
- [Fixed] Enable Add Storage Bank after download (Banks can be empty!)
- [Fixed] Cannot move down (because max preset count = 0).
- [Fixed] Delete all Storage presets does not remove them from display - does from storage.

Based on the device identification a shadow file/folder is maintained that stores all the preset's extra (meta) data.
Device Presets are to be matched by either name and/or index to the files (user could have edited presets on the device).
All device presets are automatically saved when uploaded to the device.

## PedalProDevice

- [Done] Recreate HID object on write error - connection may have been interrupted.
- [Done] Allow filtering on index (numerical input & [TODO] ranges using - or :)
- [Done] Change the way a preset is moved in the list to allow for index-gaps (where empty presets have been filtered out).
- [Done] Reverse engineer .vrf binary files to be able to read in old PedalManager files (Java).

## Pedal Pro Wishlist

- retrieve version of master FW in non-FW mode (VUT).
- upload a complete preset (160b for PPE) and make that active (load) - but not store into eprom.
- [PPE] exit button does not exit USB Remote Terminal mode (PP does it - but that is also a little too sensitive - bug?)
- [PPE] DSP parameters: navigation should work the same as other settings (1/x) (don't use Exit)
- open-source manual text so I can refernce it in the app (also make typo-changes => pull request).

## Code

- [Done] react-redux connect method: investigate
- dense on List does not work when a checkbox is in ListItem https://github.com/mui-org/material-ui/issues/9274
- [Fixed] Vertical Scrollbars wrong on tabs. (Split)Pane is too big and runs behind the tabs-control.
- reorderable/drag&drop list: https://gist.github.com/jlroettger/2d6d7ae572f985fa176c27a63cadf292

## performance

- add tslib
- [Done] remove/refactor all anonymous event handlers (start with PresetList/Item) - bind in ctor.
- [Done] use a virtual preset list: https://github.com/bvaughn/react-virtualized
- [Done] implement ShouldComponentUpdate()
- [Done] Redux connect at list item level. Bind list with number of presets and instantiate each list item with its index.
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
