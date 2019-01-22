# Crashlytics in Appcelerator Titanium

Use the native Fabric Crashlytics iOS / Android SDK in Appcelerator Titanium.

## Requirements

- [x] iOS: Titanium SDK 7.3.0+
- [x] Android: Titanium SDK 7.0.0+

## Setup

In general, remember to not use any Crashlytics API's before actually opening your first window. While this might not result
in a crash on iOS, the native Android SDK will error if being used before your app finished launching due to requiring the
native `Activity`.

### iOS

1. Create a new folder `scripts/` in your project root
2. Inside `scripts/`, create a `script-titanium-crashlytics.sh` with the following contents (replace the version with your version):
```sh
# Do not run this file manually! It is referenced from your native Xcode project
"../../modules/iphone/ti.crashlytics/1.1.0/platform/Fabric.framework/run" <YOUR_API_KEY> <YOUR_SECRET_KEY>
```
2a. If using Firebase, remember to have your `GoogleService-Info.plist` in place, as described [here](https://github.com/hansemannn/titanium-firebase).
3. Add your [API key](https://fabric.io/kits/ios/crashlytics/manual-install?step=2) to the plist section of your tiapp.xml:
```xml
  <key>Fabric</key>
  <dict>
    <key>APIKey</key>
    <string>YOUR_API_KEY</string>
    <key>Kits</key>
    <array>
      <dict>
        <key>KitInfo</key>
        <dict/>
        <key>KitName</key>
        <string>Crashlytics</string>
      </dict>
    </array>
  </dict>
```
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

### `crash()`

Simulate a crash (for testing purpose)

### `throwException()`

Simulate an exception (for testing purpose)

### `log(message, params)`

Log a Custom Event to see user actions that are uniquely important for your app in real-time.
The `params` parameter is an iOS-only `Object`.

### `setUserIdentifier(userIdentifier)`

Specify a user identifier which will be visible in the Crashlytics UI.

### `setUserName(userName)`

Specify a user name which will be visible in the Crashlytics UI.

### `setUserEmail(userEmail)`

Specify a user email which will be visible in the Crashlytics UI.

### `recordCustomException(params)`

##### (iOS only!)

This method can be used to record a single exception structure in a report.

## Author

Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](https://hans-knoechel.de))

## License

MIT

## Contributing

Code contributions are greatly appreciated, please submit a new [Pull-Request](https://github.com/hansemannn/titanium-crashlytics/pull/new/master)!

