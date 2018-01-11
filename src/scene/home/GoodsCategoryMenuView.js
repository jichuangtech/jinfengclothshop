/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan 
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import { screen, system, tool } from '../../common'
import Color from '../../widget/color'
import HomeMenuItem from './HomeMenuItem'
import Swiper from 'react-native-swiper'

// create a component
class GoodsCategoryMenuView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPage: 0
        }
    }


    render() {
        let { menuInfos, onMenuSelected } = this.props;
        let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={() => {
                        onMenuSelected && onMenuSelected(info.id)
                    }} />
            )
        )

        let pageSize = 2;
        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / pageSize)

        for (let i = 0; i < pageCount; i++) {
            let length = menuItems.length < (i * pageSize) ? menuItems.length - (i * pageSize) : pageSize
            let items = menuItems.slice(i * pageSize, i * pageSize + length)

            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            menuViews.push(menuView)
        }


        return (
            <View style={[styles.container,this.props.style]}>
                <Swiper
                    height={200}
                    loop={true}
                    index={0}
                    horizontal={true}
                >
                    {this.props.menuInfos.length === 0 ? <Text>加载中</Text>: menuViews}

                </Swiper>
            </View>

        );
    }

}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
    },
    pageControl: {
        margin: 10,
    },

    swiperRootView : {
        display:"flex",
        flexDirection: 'row',
    }
});

//make this component available to the app
export default GoodsCategoryMenuView;
