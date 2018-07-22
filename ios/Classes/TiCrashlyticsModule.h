/**
 * titanium-crashlytics
 *
 * Created by Hans Knoechel
 * Copyright (c) 2018 Hans Knoechel. All rights reserved.
 */

#import "TiModule.h"

@interface TiCrashlyticsModule : TiModule<UIApplicationDelegate> {

}

/**
 *  The easiest way to cause a crash - great for testing!
 *
 *  @param unused An unused proxy parameter
 */
- (void)crash:(__unused id)unused;

/**
 *  The easiest way to cause a crash with an exception - great for testing.
 *
 *  @param unused An unused proxy parameter
 */
- (void)throwException:(id)unused;

@end
