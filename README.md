# Muxy MEDKit JS Library

The Muxy MEDKit JS library provides easy access to Muxy's powerful extension backend architecture.

The library provides four main sections of functionality: Persistent Data Storage, an Event Manager,
a Twitch Client and a Google Analytics system.

## Hosted Versions

Muxy hosts specific versions and latest releases at https://ext-cdn.muxy.io/medkit.

Tagged releases (starting with 2.0.0):
* https://unpkg.com/@muxy/extensions-js@2.0.0/dist/medkit.umd.js
* https://unpkg.com/@muxy/extensions-js@2.0.0/dist/medkit.esm.js

Latest production release:
* https://unpkg.com/@muxy/extensions-js/dist/medkit.umd.js
* https://unpkg.com/@muxy/extensions-js/dist/medkit.esm.js

## Building

To build a production release of the library, simply run:

```sh
npm install
npm run build
```

in this directory. The complete library will be built and both UMD and ES Module versions will be
placed in the `dist/` folder.

- `dist/medkit.umd.js`
- `dist/medkit.esm.js`

## Running Tests

To run the full suite of tests, run:

```sh
npm run test
```

This will fully compile the library and execute all unit tests, printing the results to the console.
Note that this can take several minutes to execute, especially the first time.


## Getting Started

To get started building an extension with Muxy, we have a [Vue.js](https://vuejs.org) based starter
[here](https://github.com/muxy/medkit-starter-vue).

Once you've played around there and are ready to dig into some documentation, our
[Getting Started](https://docs.muxy.io/docs/quick-start) and
[Detailed Usage Guides](https://docs.muxy.io/reference/medkit-rest-api) should help.
