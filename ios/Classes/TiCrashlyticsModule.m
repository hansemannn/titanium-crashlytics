/**
 * titanium-crashlytics
 *
 * Created by Hans Knoechel
 * Copyright (c) 2020 by Hans Knöchel. All rights reserved.
 */

#import "TiCrashlyticsModule.h"
#import "TiApp.h"
#import "TiBase.h"
#import "TiExceptionHandler.h"
#import "TiHost.h"
#import "TiUtils.h"

#import <FirebaseCrashlytics/FirebaseCrashlytics.h>

@implementation TiCrashlyticsModule

#pragma mark Internal

- (id)moduleGUID
{
  return @"108ab55a-0cbb-4c63-ade2-536dabdfa250";
}

- (NSString *)moduleId
{
  return @"ti.crashlytics";
}

#pragma Public APIs

- (void)setUserIdentifier:(id)userIdentifier
{
  ENSURE_SINGLE_ARG(userIdentifier, NSString);
  [[FIRCrashlytics crashlytics] setUserID:userIdentifier];
}

- (void)log:(id)value
{
  ENSURE_SINGLE_ARG(value, NSString);
  [[FIRCrashlytics crashlytics] logWithFormat:@"%@", value];
}

- (void)crash:(id)unused
{
  assert(NO); // Forces a crash
}

@end
