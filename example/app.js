
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

win.add(btn);
win.open();