import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import {Align} from "../../css"
import {Urls, SizeStyle} from "../../utils"
import {Divider} from "../../widget"

class OrderGoodsList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let order = this.props.order;
        let ordersView = [];
        let imageStyle = SizeStyle.percentW(0.2)
        let itemPressFun = this.props.onGoodsItemPress;
        let listPressFun = this.props.listPressFun;
        for (let key in order.goodsVO) {
            let goods = order.goodsVO[key];
            let view = (
                <TouchableOpacity
                    disabled={!itemPressFun}
                    onPress={ itemPressFun && (() => itemPressFun(goods.goodsId))}
                >
                    <View key={key}>
                        <View style={[Align.lLayout, Align.vCenter]}>
                            <Image
                                style={[imageStyle, {marginLeft: 10}]}
                                source={{uri: Urls.PIC + goods.originalImg}}
                            />

                            <View style={[Align.tLayout, {width: "50%", flex: 1}]}>
                                <View style={[{flex: 4}, Align.lLayout, Align.vCenter]}>
                                    <Text
                                        style={[{color: "black"}, OrderGoodsStyle.orderTextInfoStyle]}>{goods.goodsName}</Text>
                                </View>

                                <View style={[{flex: 3}, Align.lLayout, Align.vCenter]}>
                                    <Text
                                        style={[{color: "black"}, OrderGoodsStyle.orderTextInfo2Style]}>{goods.color}</Text>
                                </View>

                                <View style={[{flex: 3}, Align.lLayout, Align.vCenter]}>
                                    <Text
                                        style={[{color: "red"}, OrderGoodsStyle.orderTextInfo2Style]}>￥{goods.shopPrice}/{goods.specName}</Text>
                                </View>
                            </View>

                            <View style={[Align.rLayout, {flex: 1, height: "100%", alignItems: "flex-end"}]}>
                                <Text style={[{color: "black", paddingRight: 15}]}>X{goods.goodsNum}</Text>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                </TouchableOpacity>
            );
            ordersView.push(view)
        }
        return (
            <TouchableOpacity
                disabled={!listPressFun}
                onPress={listPressFun && listPressFun}
            >
                <View>
                    {ordersView}
                </View>
            </TouchableOpacity>)
    }
}

const OrderGoodsStyle = StyleSheet.create({

    orderTextInfoStyle: {
        padding: 5,
        fontSize: 16
    },

    orderTextInfo2Style: {
        padding: 5,
        fontSize: 13
    }

});


export default OrderGoodsList;