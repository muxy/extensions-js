# Muxy Extension JS Library

The Muxy Extensions JS library provides easy access to Muxy's powerful backend architecture.

The extension provides four main sections of functionality: Data Storage, an Event Manager,
a Twitch Client and a Google Analytics system.

## Hosted Versions

Muxy hosts specific versions and latest releases at https://ext-cdn.muxy.io/muxy-extensions-js.

Tagged releases (starting with 1.0.0):
* https://ext-cdn.muxy.io/muxy-extensions-js/1.0.0/muxy-extensions.js
* https://ext-cdn.muxy.io/muxy-extensions-js/1.0.0/muxy-extensions.min.js

Latest production release:
* https://ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.js
* https://ext-cdn.muxy.io/muxy-extensions-js/latest/muxy-extensions.min.js

## Building

To build a production release of the library, simply run:

```sh
npm install
npm run build
```

in this directory. The complete library will be built and both minified and full versions will be
placed in the `dist/` folder.

- `dist/muxy-extensions.js`
- `dist/muxy-extensions.min.js`

## Running tests

To run the full suite of tests, run:

```sh
npm run test
```

This will fully compile the SDK and execute all unit tests, printing the results to the console.
Note that this can take several minutes to execute, especially the first time.

## Building documentation

A hosted version of the documentation in this repo can be found at
[https://dev.muxy.io/javascript/index.html](https://dev.muxy.io/javascript/index.html).

The SDK documentation can be build locally by running:

```sh
npm run docs
```

This will generate a full suite of HTML-formatted documentation in the `dist/docs/` directory. The
main entry to the docs is at `dist/docs/index.html`
