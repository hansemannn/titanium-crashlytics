# Crashlytics in Appcelerator Titanium

Use the native Fabric Crashlytics iOS / Android SDK in Appcelerator Titanium.

## Requirements

- [x] iOS: Titanium SDK 7.3.0+
- [x] Android: Titanium SDK 7.0.0+

## Setup

### iOS

1. Create a new folder `scripts/` in your project root
2. Inside `scripts/`, create a `script-titanium-crashlytics.sh` with the following contents:
```
modules/iphone/ti.crashlytics/1.0.0/Fabric.framework/run" <YOUR_API_KEY> <YOUR_SECRET_KEY>
```
3. You are ready to go!

### Android

1. Add the following to the `<application>` tag inside the manifest configuration in your tiapp.xml:
```
      <meta-data android:name="io.fabric.ApiKey"
                 android:value="YOUR_API_KEY" />
```
2. You are ready to go!

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

