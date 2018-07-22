/**
 * titanium-crashlytics
 *
 * Created by Hans Knoechel
 * Copyright (c) 2018 Hans Knoechel. All rights reserved.
 */

#import "TiCrashlyticsModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"
#import "TiApp.h"

#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

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

- (void)_configure
{
  [super _configure];
  [[TiApp app] registerApplicationDelegate:self];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [Fabric with:@[[Crashlytics class]]];
  return YES;
}

#pragma Public APIs

- (void)crash:(id)unused
{
  [[Crashlytics sharedInstance] crash];
}

- (void)throwException:(id)unused
{
  [[Crashlytics sharedInstance] throwException];
}

@end

