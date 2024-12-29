// For Maps
#import <GoogleMaps/GoogleMaps.h>
#import "AppDelegate.h"

//for firebase
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  for firebase
  [FIRApp configure];


// For Maps
  [GMSServices provideAPIKey:@"AIzaSyD8kMX3r5_zP5DAEpynVpa2Xa5ihSrz1vg"];
  
  self.moduleName = @"HotWheelZ";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
