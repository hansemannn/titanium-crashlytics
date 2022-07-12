# Crashlytics in Titanium

Use the native Crashlytics iOS / Android SDK in Titanium.

## Supporting this effort

The whole Firebase support in Titanium is developed and maintained by the community (`@hansemannn` and `@m1ga`). To keep
this project maintained and be able to use the latest Firebase SDK's, please see the "Sponsor" button of this repository,
thank you!

## Requirements

- [x] iOS: Titanium SDK 9.2.0+
- [x] Android: Titanium SDK 9.0.0+

## Setup

In general, remember to not use any Crashlytics API's before actually opening your first window. While this might not result
in a crash on iOS, the native Android SDK will error if being used before your app finished launching due to requiring the
native `Activity`.

### iOS

1. Create a new folder `scripts/` in your project root
2. Copy the `run` and `upload-symbols` shell files from this repo's `helper/` directory to `scripts/` in your project
3. Make sure your Firebase project is configured properly and you have your `GoogleService-Info.plist` in place
   as described [here](https://github.com/hansemannn/titanium-firebase).
4. Make sure the upload-symbols file's permissions are correct, running `chmod +x PROJ_ROOT_PATH/scripts/upload-symbols`
   (replace PROJ_ROOT_PATH with your real project root path)

5. You are ready to go!

### Android

```
var crash = require("ti.crashlytics");
crash.crash();  // test crash
```

1. Add the following to the `<application>` tag inside the manifest configuration in your tiapp.xml:
```xml
<meta-data android:name="firebase_analytics_collection_enabled"
  android:value="true"/>
<meta-data android:name="google_analytics_adid_collection_enabled"
  android:value="true"/>
<service
  android:name="com.google.android.gms.measurement.AppMeasurementService"
  android:enabled="true"
  android:exported="false"/>
<service
  android:name="com.google.android.gms.measurement.AppMeasurementJobService"
  android:permission="android.permission.BIND_JOB_SERVICE"
  android:enabled="true"
  android:exported="false"/>
<service
  android:name="INSERT_YOUR_APP_PACKAGE_NAME.gcm.RegistrationIntentService"
  android:exported="false"/>
<receiver
  android:name="com.google.android.gms.measurement.AppMeasurementReceiver"
  android:enabled="true">
  <intent-filter>
    <action android:name="com.google.android.gms.measurement.UPLOAD"/>
  </intent-filter>
</receiver>
```
2. You are ready to go!

## Example

See the [Sample App](https://github.com/hansemannn/titanium-crashlytics-demo/blob/master/README.md) for an example of configuring
the required API keys and project settings.

## API's

### Cross platform API's

### `Crashlytics.log(message)`

Log a Custom Event to see user actions that are uniquely important for your app in real-time.

### `Crashlytics.userId = myUserId`

Specify a user identifier which will be visible in the Crashlytics UI.

### `Crashlytics.recordError({ domain, code, userInfo })`

Records non-fatal errors. Note: The `code` and `userInfo` parameters are iOS-only.

### Android only API's

### `Crashlytics.crash()`

Simulate a crash (for testing purpose)

### `Crashlytics.throwException()`

Simulate an exception (for testing purpose)

## Author

Hans Knöchel ([@hansemannnn](https://twitter.com/hansemannnn) / [Web](https://hans-knoechel.de))

## License

MIT

## Contributing

Code contributions are greatly appreciated, please submit a new [Pull-Request](https://github.com/hansemannn/titanium-crashlytics/pull/new/master)!
