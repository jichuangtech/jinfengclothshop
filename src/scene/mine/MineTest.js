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
    Linking,Button
} from 'react-native';
import AdaptiveStyle from '../../utils/AdaptiveStyle'
import Px from '../../utils/Px'
import { connect } from 'dva/mobile';

class MineTest extends React.Component {

    render() {
        return (
            <View>
                <Text style={{backgroundColor: "#f00", width: Px.layout(280), height: Px.layout(200),
                    fontSize: Px.text(20)}}>
                    我是文字{this.props.count.num}
                </Text>
                <Button title="增加" onPress={ () => { this.doAdd() }}/>
            </View>
        );
    }

    doAdd() {
        const { dispatch } = this.props;
        dispatch({
            type: "count/addDelay"
        })
    }
}

export default connect( ({count}) => ({count}) )(MineTest);