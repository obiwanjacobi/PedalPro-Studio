# REST Service

The Main process of the Electron app is also a (local) web server (using Express).
This web server will host a REST (API) Service that the Render processes will talk to in case they need data moved.

## REST Interaction

The service has one public entry point that serves a sort of index of what the service can do. After the first response is retrieved on that entry point all subsequent url's are embedded in the service data responses.
For various actions, the url to be used is listed with the data.

## Data Strucure

Here is the data hierarchy of the information the service will be returning.

(future: to make it generic)
- Manufacturers
- Manufacturer
- Products
- Product (device)

(current: version 1)
- (Preset)Sources (device/storage/factory/online)
- Presets
- Preset
(version 2)
- Effects
- Effect

--------------------

## Messages

Collections are indicated with urls ending plural names (manufacturers).
Item/object details are indicated with urls ending in singular names (manufacturer).
All data returned that is not part of the entity/entities is prefixed with an underscore.
All messages have a "href" that contains that current url.

Links to subsequent urls for navigating or CRUD operations are formatted using the same Link type.
`{ "verb": "get|put|patch|post|delete", "url": "url/to/action", "type": "TypeOfDataReturnedForThisAction" }`

Standard url (query) parameters are used to sort, filter, take and skip results.
`{ "f": "FilterOrSearch-Expression", "o": "SortOrOrder-FieldName", "t": "takeOrSize/Length/Count-Number", "s": "Skip-Number" }`

### Sources

Lists all the sources available for retrieving and storing presets.

`[
    "'detected-device-name'",
    "'detected-device-factory'",
    "storage",
    "online"
]`

A single source may look something like:

`{
    "name": "PedalPro",
    "version": "1.2.3",
    "presets": "40"
}`

### Presets

Provides a list of all presets for a specific source.

`{
    "index": "1",
    "name": "preset 1",
    "empty": true,
    "expression": true,
    "channels": 2,
    "effects": {
        "compressor": {
            "setting": "value"
        },
        "equalizer": {
            "setting": "value"
        },
        "more": {
            "setting": "value"
        },
    },
    "meta": {
        "source": {
            "manufacturer": "Vintage Revolution",
            "name": "PedalPro",
            "version": "1.2.3"
        },
        "genre": "rock",
        "version": "1.0.2"
        "author": {
            "name": "Marc Jacobi",
            "email": "obiwanjacobi@hotmail.com",
            "website": "",
        },
        "url": "https://github.com/author/repo"
    }
}`

### Manufacturers

Provides a list of supported manufacturers the application can read.

`{
    "manufacturers": [
        "Vintage Revolution",
        "Roland",
        "Boss",
        "More..."
    ],
    "_add": { "verb": "post", "url": "./manufacturers/add", "type": "manufacturer" }
}`

### Manufacturer

Provides details of a specific manufacturer.

`{
    "manufacturer": {
        "name": "Vintage Revolution",
        "hidVendorId": "0xAF",
        "More..."
    }
}`
