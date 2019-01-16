import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Urls, NetUtils, DisplayUtils}from "../../utils"
import {Align} from "../../css"
import {SpacingView} from "../../widget"
import OrderInfoView from "./OrderInfoView"
import {Toast} from "antd-mobile-rn"
import OrderGoodsList from "./OrderGoodsList"
import {OrderStatus} from "../../constant"

const OrderInfoStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },

    orderTextInfoStyle: {
        padding: 5
    }


});

class OrderDetailView extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let order = this.props.navigation.state.params.order;
        let willPayViewStyle = {
            display:DisplayUtils.getDisplay(OrderDetailView.isWillPayStatus(order.orderStatus))
        };

        return (
            <View style={[{backgroundColor:"white"}, Align.tLayout]}>
                <Text style={[{paddingTop:15, paddingBottom:15, alignSelf:"center"}, OrderDetailStyle.orderStatusTipStyle]}>
                    {OrderStatus.ORDER_STATUS_TIP[order.orderStatus]}
                </Text>
                <SpacingView/>

                <View style={[Align.rLayout, {alignItems:"center"}, OrderDetailStyle.infoItemStyle]}>
                    <View style={[{flex:1}, Align.lLayout]}><Text style={[OrderDetailStyle.leftMargin]}>收货人: {order.consignee}</Text></View>
                    <View style={[{flex:1}, Align.rLayout]}><Text style={[OrderDetailStyle.rightMargin]}>{order.mobile}</Text></View>
                </View>
                <View style={[Align.rLayout,  {height:20, alignItems:"center"}]}>
                    <View style={[{flex:1}, Align.lLayout]}><Text  style={[OrderDetailStyle.leftMargin]}>收货地址: {order.address}</Text></View>
                </View>
                <SpacingView/>

                <OrderGoodsList
                    onGoodsItemPress={(goodsId) => this.showGoodsDetail(goodsId)}
                    order={order}
                    />
                <SpacingView/>
                <View style={[Align.rLayout, {alignItems:"center"}, OrderDetailStyle.infoItemStyle]}>
                    <View style={[{flex:1}, Align.lLayout]}><Text style={[OrderDetailStyle.leftMargin]}>订单总价：</Text></View>
                    <View style={[{flex:1}, Align.rLayout]}><Text style={[OrderDetailStyle.rightMargin]}>¥{order.totalAmount}</Text></View>
                </View>

                <SpacingView/>
                <View style={[willPayViewStyle]}>
                    <View style={[Align.rLayout, {alignItems:"center"}, OrderDetailStyle.infoItemStyle]}>
                        <View style={[{flex:1}, Align.lLayout]}><Text style={[OrderDetailStyle.leftMargin]}>需付款：</Text></View>
                        <View style={[{flex:1}, Align.rLayout]}><Text style={[OrderDetailStyle.rightMargin]}>¥{order.totalAmount}</Text></View>
                    </View>
                    <SpacingView/>
                    <View style={Align.rLayout}>
                        <TouchableOpacity
                            onPress={()=> OrderDetailView.pay()}
                        >
                            <Text style={[OrderDetailStyle.payBtnStyle, {marginTop:10}]}>立即支付</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    static pay() {
        Toast.info("进行支付")
    }

    showGoodsDetail(goodsId) {
        let goodsInfo = {
            goodsId: goodsId
        };
        this.props.navigation.navigate("GoodsDetail", goodsInfo);
    }


    static isWillPayStatus(orderStatus) {
        return OrderStatus.ORDER_STATUS_WILL_PAY === orderStatus
    }
}

const OrderDetailStyle = StyleSheet.create({
    orderStatusTipStyle: {
        color:"red",
        fontSize:20
    },

    leftMargin: {
        marginLeft:10
    },

    rightMargin: {
        marginRight:10
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
    },

    infoItemStyle: {
        height:40
    }
});



export default OrderDetailView;