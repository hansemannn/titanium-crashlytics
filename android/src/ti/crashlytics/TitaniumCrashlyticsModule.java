/**
 * This file was auto-generated by the Titanium Module SDK helper for Android
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2017 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 */
package ti.crashlytics;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiConfig;

import android.app.Activity;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

@Kroll.module(name="TitaniumCrashlytics", id="ti.crashlytics")
public class TitaniumCrashlyticsModule extends KrollModule
{

	// Standard Debugging variables

	private static final String LCAT = "TitaniumCrashlyticsModule";
	private static final boolean DBG = TiConfig.LOGD;

	public TitaniumCrashlyticsModule()
	{
		super();
	}

	@Override
	public void onStart(Activity activity) {
		super.onStart();
		Fabric.with(activity, new Crashlytics());
	}

	// Methods

	@Kroll.method
	public void crash()
	{
		Crashlytics.getInstance().crash();
	}

	@Kroll.method
	public void log(String message)
	{
		Crashlytics.log(message);
	}

	@Kroll.method
	public void throwException()
	{
		try {
			throw new RuntimeException("This is a crash");
		} catch (RuntimeException e) {
			Crashlytics.logException(e);
		}
	}

	@Kroll.method
	public void setUserIdentifier(String userIdentifier) {
		Crashlytics.setUserIdentifier(userIdentifier);
	}

	@Kroll.method
	public void setUserName(String userName) {
		Crashlytics.setUserName(userName);
	}

	@Kroll.method
	public void setUserEmail(String userEmail) {
		Crashlytics.setUserEmail(userEmail);
	}
}

