/**
 * titanium-firebase-config
 *
 * Created by Hans Knoechel
 * Copyright (c) 2020 by Hans Knöchel. All rights reserved.
 */

#import "TiModule.h"

@interface TiCrashlyticsModule : TiModule

- (void)setUserIdentifier:(id)userIdentifier;

- (void)log:(id)value;

@end
