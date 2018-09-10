/**
 * titanium-crashlytics
 *
 * Created by Hans Knoechel
 * Copyright (c) 2018 Hans Knoechel. No rights reserved.
 */

#import "TiCrashlyticsModule.h"
#import "TiApp.h"
#import "TiBase.h"
#import "TiExceptionHandler.h"
#import "TiHost.h"
#import "TiUtils.h"

#import <Crashlytics/Crashlytics.h>
#import <Fabric/Fabric.h>

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
  [Fabric with:@[ [Crashlytics class] ]];
  return YES;
}

#pragma Public APIs

- (void)crash:(id)unused
{
  [[Crashlytics sharedInstance] crash];
}

- (void)setUserIdentifier:(id)userIdentifier
{
  ENSURE_SINGLE_ARG(userIdentifier, NSString);
  [[Crashlytics sharedInstance] setUserIdentifier:userIdentifier];
}

- (void)setUserName:(id)userName
{
  ENSURE_SINGLE_ARG(userName, NSString);
  [[Crashlytics sharedInstance] setUserName:userName];
}

- (void)setUserEmail:(id)userEmail
{
  ENSURE_SINGLE_ARG(userEmail, NSString);
  [[Crashlytics sharedInstance] setUserEmail:userEmail];
}

- (void)log:(NSArray *)args
{
  [Answers logCustomEventWithName:args[0] customAttributes:args.count > 1 ? args[1] : nil];
}

- (void)recordCustomException:(id)params
{

  ENSURE_SINGLE_ARG(params, NSDictionary);
  NSString *name = params[@"name"];
  NSString *reason = params[@"reason"];
  NSArray *frames = params[@"frames"];

  NSMutableArray<CLSStackFrame *> *frameArray = [NSMutableArray arrayWithCapacity:frames.count];

  for (NSString *frame in frames) {
    [frameArray addObject:[CLSStackFrame stackFrameWithSymbol:frame]];
  }

  [[Crashlytics sharedInstance] recordCustomExceptionName:name
                                                   reason:reason
                                               frameArray:frameArray];
}

- (void)throwException:(id)unused
{
  [[Crashlytics sharedInstance] throwException];
}

@end
