# Crashlytics in Appcelerator Titanium

Use the native Fabric Crashlytics iOS / Android SDK in Appcelerator Titanium.

## Supporting this effort

The whole Firebase support in Titanium is developed and maintained by the community (`@hansemannn` and `@m1ga`). To keep
this project maintained and be able to use the latest Firebase SDK's, please see the "Sponsor" button of this repository,
thank you!

## Requirements

- [x] iOS: Titanium SDK 8.0.0+
- [x] Android: Titanium SDK 7.0.0+

## Setup

In general, remember to not use any Crashlytics API's before actually opening your first window. While this might not result
in a crash on iOS, the native Android SDK will error if being used before your app finished launching due to requiring the
native `Activity`.

## Breaking changes!

Module version 2.0.0 uses Firebase Crashlytics instead of the (deprecated) Fabric Crashlytics. Please make sure to check the
removed and changed API's!

### iOS

1. Create a new folder `scripts/` in your project root
2. Copy the `run` and `upload-symbols` shell files from this repo's `helper/` directory to `scripts/` in your project
3. Make sure your Firebase project is configured properly and you have your `GoogleService-Info.plist` in place, 
as described [here](https://github.com/hansemannn/titanium-firebase).

4. You are ready to go!

### Android

1. Add the following to the `<application>` tag inside the manifest configuration in your tiapp.xml:
```xml
<meta-data android:name="io.fabric.ApiKey" android:value="YOUR_API_KEY" />
```
2. Add your GUID or a random UUID to `[app]/platform/android/res/values/strings`:
```xml
<string name="com.crashlytics.android.build_id">RANDOM_UUID</string>
```
3. You are ready to go!

## Example

See the [Sample App](https://github.com/hansemannn/titanium-crashlytics-demo/blob/master/README.md) for an example of configuring
the required API keys and project settings.

## API's

### Cross platform API's

### `log(message)`

Log a Custom Event to see user actions that are uniquely important for your app in real-time.

### `setUserIdentifier(userIdentifier)`

Specify a user identifier which will be visible in the Crashlytics UI.

### Android only API's

### `crash()`

Simulate a crash (for testing purpose)

### `throwException()`

Simulate an exception (for testing purpose)

### `setUserName(userName)`

Specify a user name which will be visible in the Crashlytics UI.

### `setUserEmail(userEmail)`

Specify a user email which will be visible in the Crashlytics UI.


## Author

Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](https://hans-knoechel.de))

## License

MIT

## Contributing

Code contributions are greatly appreciated, please submit a new [Pull-Request](https://github.com/hansemannn/titanium-crashlytics/pull/new/master)!

