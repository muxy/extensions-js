# Change Log

## 2019-05-21

v2.2.9

## Added

- Export Twitch types from module root.
- Add transactionReceipt to TwitchBitsTransaction.
- Easier customization of behavior for different environments.

## 2019-05-03

v2.2.8

### Added

- Log information about unknown environments.
- Move environment configuration setup into new config class.

## 2019-04-24

v2.2.7

### Added

- Whitelist for internal staging environment.

## 2019-02-27

v2.2.6

### Fixed

- Update staging URL in admin auth whitelist.

### Added

- Added ability to quickly set an extension's required configuration from MEDKit.
- Added extension version to available metadata.

## 2019-01-16

v2.2.5

### Fixed

- Reduced the automatic deduplication on message events from 60 seconds to 5. This could prevent
clients from receiving e.g. vote update events more than once a minute.

### Updated

- SDK now throws an error when attempting to send or receive messages before it has fully `loaded`.
Previously, these operations would fail silently.

## 2019-01-03

v2.2.4

### Fixed

- Actually fix `default` export in UMD build. 🙄

## 2019-01-03

v2.2.3

### Fixed

- Fix requirement to use `Muxy.default.*` when using UMD build of extension.

## 2018-11-29

v2.2.2

### Fixed

- Support Twitch-sent global broadcast messages.
- Correctly whitelist type definition files for NPM.

## 2018-11-20

v2.2.1

### Fixed

- Added missing type definition files.

## 2018-11-19

v2.2.0

### Added

- Added admin functionality to set and retrieve individual viewer state.
- Exposed more types publicly to aid TypeScript development.

## 2018-11-09

v2.1.1

### Fixed

- Fixed up some internal naming inconsistencies with the trivia system.
- Exposed the TriviaQuestionState enum on the global Muxy object.

## 2018-11-07

v2.1.0

### Added

- Added new trivia system to support polls with winners.
- Added ability to fetch a list of users who have shared their identity with the extension.

## Fixed

- Removed another type check.

## 2018-11-03

v2.0.3

### Fixed

- Removed type checking on getTwitchUsers\* calls.

## 2018-11-02

v2.0.2

### Fixed

- Make sure `TwitchClient.loaded` doesn't resolve until the library is fully ready.
- Fix issue where running an admin-extension would use the production server instead of sandbox.

## 2018-10-31

v2.0.1

### Fixed

- Passing a partial URL as a debug option will no longer make all API requests relative to the hosted domain.

## 2018-10-22

v2.0.0

### Added

- Added ability to easily access Twitch context information.
- Added server time integration to provide consistent timing information.
- Added debug override options.
- Added new "admin" extension type.
- Added accessors for extension secret state (admin-viewable only).
- Added full vote log access.

### Updated

- Convert entire codebase to TypeScript.
- Move to rollup to decrease library code size.
- Move to jest for testing framework.

## 2018-05-03

v1.1.0

### Added

- Added new extension-global state for viewers.

## 2018-03-22

v1.0.7

### Added

- Added helix method for fetching a list of users by IDs.

### Updated

- Updated `loaded` method to properly reject on server communication error.

### Fixed

- Fix for environment detection.
- Fixed passing rank id to backend for proper rank isolation.

## 2018-01-05

v1.0.6

### Added

- Convenience functions for working with new Twitch commerce functionality.

## 2017-10-11

v1.0.5

### Fixed

- Fixed missing function `environmentDetector` error.

## 2017-10-11

v1.0.5

### Fixed

- Fixed missing function `environmentDetector` error.

## 2017-10-11

v1.0.4

### Updated

- Deprecated `extensionID` in favor of `clientID` when calling Muxy.setup().
- Moved documentation into `manual/`.
- `Util.consolePrint` no longer prints to the console when running in production mode.

### Fixed

- Fixed npm pre-built library.

## 2017-09-21

v1.0.3

### Updated

- Additional documentation.
- Fixed UMD ES6 class fighting.

## 2017-09-11

v1.0.2

### Updated

- Moved xhr-promise lib into the repo to work around a CSP enforcement issue on Twitch.

## 2017-09-08

v1.0.1

### Updated

- Removed analytics access to localStorage (unused and unneeded).
- Removed some potentially unique identifiers.

### Fixed

- Setup documentation now uses the same words as Twitch.
- Changed Twitch dev site link.

## 2017-08-31

v1.0.0

- Initial release
