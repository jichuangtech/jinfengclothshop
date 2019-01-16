/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  //金峰旧家 热点
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.7:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //棕榈泉 热点
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.112:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //蔚蓝国际 主卧热点
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.102:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //水印长天 宿舍 wifi热点
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.118:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //手机热点
//  jsCodeLocation = [
//                    NSURL URLWithString:@"http://172.20.10.4:8081/index.ios.bundle?platform=ios&dev=true"];
  //手机USB热点
//  jsCodeLocation = [NSURL URLWithString:@"http://172.20.10.3:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //离线打包
//  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
  
  //默认
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];


  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"jfclothshop"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
@end
