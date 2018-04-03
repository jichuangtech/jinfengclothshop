import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AppState,
    Linking
} from 'react-native';
import AdaptiveStyle from '../../utils/AdaptiveStyle'
import Px from '../../utils/Px'

export default class MineTest extends React.Component {

    render() {
        return (
            <View>
                <Text style={{backgroundColor: "#f00", width: Px.layout(280), height: Px.layout(200),
                    fontSize: Px.text(20)}}>
                    我是文字
                </Text>
            </View>
        );
    }
}