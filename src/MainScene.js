/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { StatusBar, Text, Button, View} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import color from './widget/color'
//import { screen, system, tool } from './common'
import TabBarItem from './widget/TabBarItem'

import GoodsListScene from './scene/goods/GoodsListScene'
import GoodsDetailScene from './scene/goods/GoodsDetailScene'
import HomeScene from './scene/home/HomeScene'
import OrderScene from './scene/order/OrderScene'
import OrderDetailView from './scene/order/OrderDetailView'
import ShopCarScene from './scene/car/ShopCarScene'
import NearbyScene from './scene/nearby/NearbyScene'
import MineScene from './scene/mine/MineScene'
import LoginScene from './scene/login/LoginScene'


//import WebScene from './widget/WebScene'
//import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'

const lightContentScenes = []
// const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }

    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// create a component
class RootScene extends Component {
    constructor() {
        super()

        StatusBar.setBarStyle('dark-content')
    }

    render() {
        return (
            <Navigator
            />
        );
    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({ navigation }) => ({
                title:"首页",
                tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            }),
        },

        // Nearby: {
        //     screen: NearbyScene,
        //     navigationOptions: ({ navigation }) => ({
        //         title:"附近",
        //         tabBarLabel: '附近',
        //         tabBarIcon: ({ focused, tintColor }) => (
        //             <TabBarItem
        //                 tintColor={tintColor}
        //                 focused={focused}
        //                 normalImage={require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
        //                 selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
        //             />
        //         )
        //     }),
        // },

        Car: {
            screen: ShopCarScene,
            navigationOptions: ({ navigation }) => ({
                title:"购物车",
                tabBarLabel: '购物车',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_order@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({ navigation }) => ({
                title:"我的",
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_mine@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    />
                ),
            }),
         }


    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff'},
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: {
            screen: Tab,
            navigationOptions: {
            }
         },

         GoodsList: {
            screen: GoodsListScene,
         },

         GoodsDetail: {
            screen: GoodsDetailScene,
         },

         Login: {
              screen: LoginScene,
              navigationOptions: {
                title:"登录",
              }
         },
         Order: {
            screen: OrderScene,
            navigationOptions: {
                title:"我的订单"
            }
         },
         OrderDetail :{
             screen: OrderDetailView,
             navigationOptions: {
                 title:"订单详情"
             }
         }

    },
    {
        navigationOptions: {
            headerStyle: { backgroundColor: color.white},
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        }
    }
);
//make this component available to the app
export default RootScene;
