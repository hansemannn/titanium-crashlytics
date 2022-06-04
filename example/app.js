
/** 
 * Note: Crashes and exceptions are handled internally by the modules, 
 * there is not more to do. In case you want to test crashes and exceptions, 
 * see the following example.
 **/

import Crashlytics from 'ti.crashlytics';

const win = Ti.UI.createWindow({
  backgroundColor: '#fff'
});

const btn = Ti.UI.createButton({
  title: 'Test Crash'
});

btn.addEventListener('click', () => {
  Crashlytics.crash();
});

// Use recordError() to logs non-fatal (JS) errors in iOS:
Ti.App.addEventListener("uncaughtException", function(e) {
  // Log some logs, for example full error info:
  FirebaseCrashlytics.log(JSON.stringify(e));

  FirebaseCrashlytics.recordError({
    domain: e.message, // Domain + code used to group similar errors in dashboard
    code: 1,
    // Put additional info here
    userInfo: {}
  });
});

win.add(btn);
win.open();