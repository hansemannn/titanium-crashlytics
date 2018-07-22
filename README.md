# Crashlytics in Appcelerator Titanium

Use the native Fabric Crashlytics iOS / Android SDK in Appcelerator Titanium.

## Requirements

- [x] iOS: Titanium SDK 7.3.0+
- [x] Android: Titanium SDK 7.0.0+

## Setup

### iOS

1. Create a new folder `scripts/` in your project root
2. Inside `scripts/`, create a `script-titanium-crashlytics.sh` with the following contents:
```sh
# Do not run this file manually! It is referenced from your native Xcode project
"../../modules/iphone/ti.crashlytics/1.0.0/platform/Fabric.framework/run" <YOUR_API_KEY> <YOUR_SECRET_KEY>
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
2. You are ready to go!

## Example

See the [Sample App](https://github.com/hansemannn/titanium-crashlytics-demo/blob/master/README.md) for an example of configuring
the required API keys and project settings.

## API's

### `crash()`

Simulate a crash (for testing purpose)

### `throwException()`

Simulate an exception (for testing purpose)

## Author

Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](https://hans-knoechel.de))

## License

MIT

## Contributing

Code contributions are greatly appreciated, please submit a new [Pull-Request](https://github.com/hansemannn/titanium-crashlytics/pull/new/master)!

