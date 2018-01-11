/**
 * Created by Bingo on 2017/9/13.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage
} from 'react-native';

import {OrderStatus} from "../../constant";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view"
import {Order, EmptyView, OrderInfoView} from "../../widget";
import { NetUtils, Urls, RespUtils, DisplayUtils} from "../../utils"
import {Align} from "../../css"
import SpacingView from "../../widget/SpacingView";

class OrderScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            orders:[],
            orderStatus: OrderStatus.ORDER_STATUS_ALL
        }

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({
            orderStatus: this.props.orderStatus
        })
        this.queryOrder(this.getInitOrderStatus())
    }

    getInitOrderStatus() {
        return this.props.navigation.state.params.orderStatus;
    }

    render() {
        let that = this;
        let tipStyle = {
            display:DisplayUtils.getDisplay(this.state.orders.length === 0)
        };
        let lvStyle = {
            display:DisplayUtils.getDisplay(this.state.orders.length > 0)
        };
        return (<View style={[{flexDirection:"column", flex:1}]}>

                <ScrollableTabView
                    style={{height:"10%", backgroundColor:"white"}}
                    tabBarUnderlineStyle={{backgroundColor:"#f00", height:2}}
                    tabBarActiveTextColor="red"
                    tabBarInactiveTextColor="gray"
                    initialPage={that.getInitOrderStatus()}
                    onChangeTab={(obj)=>this.onTabChange(obj)}
                    renderTabBar={() => <DefaultTabBar/>} >
                    <Text tabLabel="全部" />
                    <Text tabLabel="待支付" />
                    <Text tabLabel="待发货" />
                    <Text tabLabel="待收货" />
                    <Text tabLabel="已完成" />
                </ScrollableTabView>

            <View
                style={[OrderStyle.listViewStyle, Align.center]}
            >
                <FlatList
                    ItemSeparatorComponent={SpacingView}
                    style={[{width:"100%" ,backgroundColor:"white"}, lvStyle]}
                    numColumns={1}
                    horizontal={false}
                    onRefresh={() => this.refresh()}
                    refreshing={that.state.isRefreshing}
                    data={that.state.orders}
                    renderItem={({item, index}) =>
                        <OrderInfoView
                            key={index}
                            showDetail={()=>this.showOrderDetail(item)}
                            order={item}
                        />
                    }
                />
                <EmptyView
                    style={[tipStyle]}
                />
            </View>
            </View>)
    }

    refresh() {
        this.queryOrder(this.state.orderStatus)
    }

    onTabChange(tab) {
        // alert(" tab index: " + tab.i)
        console.log(" tab index: " + tab.i)
        this.setState({
            isRefreshing:true
        })
        //更新订单的数据
        this.queryOrder(tab.i)
    }

    showOrderDetail(order) {
        this.props.navigation.navigate("OrderDetail", {
            order: order
        })
    }

    queryOrder(orderStatus) {
        let url = Urls.ORDERS_BY_STATUS.format(orderStatus)
        let that = this;
        AsyncStorage.getItem("access_token", function (error, value) {
            if(error === null) {
                NetUtils.getJson(url, value, null, function (json) {
                    that.updateOrderList(json, orderStatus)
                }, function (fail) {
                }, function (error) {
                });
            } else {
            }
        })
    }

    updateOrderList(json, orderStatus) {
        if(!RespUtils.isSuccess(json.statusCode)) {
            console.info("order list query error, code: " + json.statusCode);
            return;
        }
        let data = [];
        let orders = json.data;
        for(let index = 0; index < orders.length; index ++) {
            let row = {
                key: '' + index,
                orderSn: orders[index].orderSn,
                totalAmount: orders[index].totalAmount,
                orderStatus: orders[index].orderStatus,
                goodsVO: orders[index].goodsVO,
                orderId: orders[index].orderId,
                consignee: orders[index].consignee,
                mobile: orders[index].mobile,
                address: orders[index].address
            };
            data.push(row);
        }

        this.setState({
            orders: data,
            isRefreshing:false,
            orderStatus:orderStatus
        });
    }
}

const OrderStyle = StyleSheet.create({
    container: {
        backgroundColor:"#fff"
    },

    listViewStyle: {
        height:"90%"
    }
})

export default OrderScene;