import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {Align} from "../../css/index";
import {Divider} from "../../widget";
import {OrderStatus} from "../../constant"
import OrderGoodsList from "./OrderGoodsList"
import {DisplayUtils} from "../../utils"
import {Toast} from "antd-mobile-rn"

class OrderInfoView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let order = this.props.order;
        let willPayViewStyle = {
            display:DisplayUtils.getDisplay(OrderStatus.ORDER_STATUS_WILL_PAY === order.orderStatus)
        }
        return (
            <View style={[OrderInfoStyle.container, Align.tLayout]}>

                <View style={[Align.lLayout, {marginTop: 8}]}>
                    <View style={[{flex: 1}]}>
                        <Text style={[{paddingLeft: 10}]}>订单编号: {order.orderSn}</Text>
                    </View>
                    <View style={[{flex: 1}, Align.rLayout]}>
                        <Text style={[{paddingRight: 10}]}>{OrderStatus.ORDER_STATUS_ZH[order.orderStatus]}</Text>
                    </View>
                </View>
                <Divider/>

                <OrderGoodsList
                    listPressFun={this.props.showDetail}
                    order={order}
                />

                <View style={[Align.lLayout, Align.vCenter, {marginBottom: 5, height:30}]}>
                    <View style={[{flex:1}]}>
                        <Text style={[{paddingLeft: 10}]}>合计：{order.totalAmount}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.pay()}
                    >
                        <View style={[{flex:1}, Align.rLayout, willPayViewStyle]}>
                            <Text style={[OrderInfoStyle.payBtnStyle]}>立即支付</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>)
    }

    pay() {
        Toast.info("进行支付")
    }
}

const OrderInfoStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },

    orderTextInfoStyle: {
        padding: 5
    },

    payBtnStyle: {
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        borderWidth:1,
        borderColor:"red",
        color:"red"

    }




});

export default OrderInfoView;