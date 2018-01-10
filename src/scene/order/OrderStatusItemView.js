import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { SizeStyle } from "../../utils/index"

/**
 * 订单状态图标 和 状态说明的组件
 */
class OrderStatusItemView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let orderStatusImgStyle = SizeStyle.percentW(0.073);
        return (<TouchableOpacity
            onPress={this.props.onPress}
                style={[StatusItemStyle.orderStatusItemStyle]}>

            <View style={[{alignItems: "center"}]}>
                <Image
                    style={[orderStatusImgStyle, StatusItemStyle.orderStatusImgStyle]}
                    source={this.props.picUrl}
                />
                <Text style={StatusItemStyle.orderStatusTitleStyle}>
                    {this.props.title}
                </Text>
            </View>

        </TouchableOpacity>)
    }
}

const StatusItemStyle = StyleSheet.create({
    orderStatusItemStyle: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "column",
        alignItems: "center"
    },
    orderStatusImgStyle: {
        marginTop: 4
    },
    orderStatusTitleStyle: {
        marginTop: 7,
        fontSize: 13
    }

});
export default OrderStatusItemView;