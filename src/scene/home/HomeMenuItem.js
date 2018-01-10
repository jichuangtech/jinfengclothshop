/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan 
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// import { Heading2 } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import * as Urls from "../../utils/Urls";

// create a component
class HomeMenuItem extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              {...this.props}
            >
                <Image source={{uri: Urls.GOODS_CATEGORY_PIC + this.props.icon}} resizeMode='contain' style={styles.icon} />
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5,
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5,
        borderRadius: screen.width / 18
    }
});

//make this component available to the app
export default HomeMenuItem;
