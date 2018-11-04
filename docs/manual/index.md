# User Manual

The PedalPro Studio application allows the user to remotely control the PedalPro or PedalPro-Ex from a PC connected by USB.

## Installing

The PedalPro Studio application is delivered using a setup program. Simply execute the setup and the application will install.

## Connecting

* Connect the PedalPro to the PC using the appropriate USB cable.
* Turn the PedalPro on and wait for it to boot.
* Press and hold the `EXIT (USB)` button until the display reports: _USB Remote Terminal_
* The PC should recognize the PedalPro at this point.

## Application Concepts

* Initially all data is `download`ed from the _source_ into the application.
* Only changed data is `upload`ed from the application up to the _source_.
* Possible _sources_ are:
  * Device
  * Storage
  * Factory
* Presets that were altered (compared to it's _source_) but not 'saved' are marked with either a flag (changed) or a garbage bin (marked as deleted).
* All changes remain in memory until an `upload` is performed.

## Device

Downloading here will contact the connected PedalPro device over USB and request all its presets. By default `{empty_ps}` presets are not displayed.

The presets are arranged in columns to assist in having a clear overview. Each preset is identified by its position and its name.

A preset item can be expanded by pressing the **V** button and will reveal a small pane that contains controls to

* Edit the preset's name.
* Move the preset up or down in the list, swapping places with the preset that was in that position previously.
* Mark the preset as deleted.

Each preset in the list also has an edit button that brings up the effects editor.

Clicking on the position number of the preset item, selects the preset and additional functions become available in the toolbar.

## Storage

Downloading here will load the storage banks from the file system of the PC. Note that this is automatically done at startup.

A storage bank is a named collection of presets. On the PC it is represented as folder on the file system.




## Factory

## Effects