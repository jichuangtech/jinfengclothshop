/**
 * Created by Bingo on 2017/9/13.
 */

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
import {connect} from "react-redux"
import {NetUtils, Urls, RespUtils, ReduxProps, DisplayUtils} from "../../utils";
import {Button, Switch, InputItem, List, Toast} from 'antd-mobile';
import {LoginType} from "../../constant"
import SizeStyle from "../../utils/SizeStyle";
import Align from "../../css/Align";
import {SpacingView, OrderStatusItemView} from "../../widget"
import {screen} from "../../common"
import {OrderStatus} from "../../constant";

const TOAST_DURATION = 1.2

class HomeScene extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        AppState.addEventListener("change", this.onAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.onAppStateChange)
    }

    onAppStateChange(nextAppState) {
        console.log("nextAppState: " + nextAppState)
    }

    render() {
        let title = this.isLogin() ? "注销" : "前往登录";
        let btnVisible = {
            display: DisplayUtils.getDisplay(!this.isLogin())
        };

        let infoViewVisible = {
            display: DisplayUtils.getDisplay(this.isLogin())
        };

        let picSizeStyle = SizeStyle.percentW(0.17);
        let borderRadius = screen.width * 0.17 / 2; //设置成宽度，或者高度的一半 1/2 就够了

        let orderStatusImgStyle = SizeStyle.percentW(0.073)
        return (
            <View style={MineStyle.container}>
                <Button
                    onClick={() => this.onLogoutClick()}
                    style={[MineStyle.btnStyle, btnVisible]}
                >{title}
                </Button>

                <View style={[infoViewVisible, MineStyle.infoViewStyle, {width:"100%"}]}>
                    <View style={[{width: "100%", height: "30%"}, Align.center]}>
                        <Image
                            style={[picSizeStyle, {backgroundColor: "gray", borderRadius:borderRadius}]}
                            source={require("../../img/Home/search_icon.png")}
                        />
                        <Text style={[{marginTop: 10, color: "#fff", fontSize: 20}]}>黄彬</Text>

                    </View>

                    <SpacingView/>

                    <TouchableHighlight
                        onPress={()=> this.goToOrderScene(OrderStatus.ORDER_STATUS_ALL)}
                        style={[MineStyle.itemStyle]}>
                        <View style={[{flexDirection:"row", flex:1}, Align.vCenter]}>
                            <View style={[Align.lLayout, {flex: 1, height: "100%", marginLeft:10},
                                Align.vCenter]}>
                                <Text style={[MineStyle.itemTextStyle]}>我的订单</Text>
                            </View>

                            <View style={[Align.rLayout, {flex: 1, height: "100%", marginRight:10},
                                Align.vCenter]}>
                                <Text style={[MineStyle.itemTextStyle]}>查看更多订单</Text>
                            </View>

                        </View>
                    </TouchableHighlight>

                    <SpacingView/>

                    <View style={[MineStyle.itemStyle, Align.lLayout]}>

                        <OrderStatusItemView
                            onPress={()=> this.goToOrderScene(OrderStatus.ORDER_STATUS_WILL_PAY)}
                            title="待支付"
                            picUrl={require("../../img/Order/order_will_pay_icon.png")}
                        />

                        <OrderStatusItemView
                            onPress={()=> this.goToOrderScene(OrderStatus.ORDER_STATUS_WILL_DELIVERY)}
                            title="待发货"
                            picUrl={require("../../img/Order/order_will_delivery_icon.png")}
                        />

                        <OrderStatusItemView
                            onPress={()=> this.goToOrderScene(OrderStatus.ORDER_STATUS_WILL_TAKE_DELIVERY)}
                            title="待收货"
                            picUrl={require("../../img/Order/order_will_take_delivery_icon.png")}
                        />

                        <OrderStatusItemView
                            onPress={()=> this.goToOrderScene(OrderStatus.ORDER_STATUS_FINISH)}
                            title="已完成"
                            picUrl={require("../../img/Order/order_finish_icon.png")}
                        />
                    </View>

                    <SpacingView/>

                    <TouchableHighlight
                        onPress={()=> this.makeCall()}
                        style={[MineStyle.itemStyle]}>
                        <View style={[{flexDirection:"row", flex:1}, Align.vCenter]}>
                            <View style={[Align.lLayout, {flex: 1, height: "100%", marginLeft:10},
                                Align.vCenter]}>
                                <Text style={[MineStyle.itemTextStyle]}>联系客服</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <SpacingView/>
                </View>

            </View>
        );
    }

    makeCall() {
        let url = 'tel: ' + "17750224350";
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    goToOrderScene(orderStatus) {
        this.props.navigation.navigate("Order", {
            orderStatus: orderStatus
        })
    }

    isLogin() {
        return this.props.loginProps.status === "in"
    }

    onLogoutClick() {
        if (!this.isLogin()) {
            const {navigate} = this.props.navigation;
            let from = {
                from: "Mine"
            };
            navigate('Login', from);
            return;
        }


        let that = this
        AsyncStorage.getItem("access_token", function (error, value) {
            if (error === null && value !== null) {
                let token = {
                    token: value
                }

                NetUtils.postJson(Urls.LOGOUT, token, function (json) {

                    if (RespUtils.isSuccess(json.statusCode)) {

                        AsyncStorage.removeItem("access_token", function () {
                            Toast.success("注销成功", TOAST_DURATION, function () {

                                //1改变状态
                                that.props.dispatch({type: LoginType.LOGGED_OUT})
                                //2跳转到主界面
                                const {navigate} = that.props.navigation;
                                navigate('Login');
                            })
                        }, function (error) {
                            console.error("删除access_token error: " + JSON.stringify(error))
                        })

                    } else {
                        Toast.fail("注销失败:" + json.msg, TOAST_DURATION)
                    }

                }, function (json) {
                    Toast.fail("注销失败:" + JSON.stringify(json), TOAST_DURATION)
                });
            }
        })
    }

}

const MineStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "column" ,
    },

    btnStyle: {
        marginTop: "5%",
        width: "85%",
        height: "7%",
    },

    inputContainerStyle: {
        width: "100%",
    },

    operationStyle: {
        flexDirection: "row",
    },

    operationItemStyle: {
        color: "blue",
        marginRight: 15,
        fontSize: 15,
        alignSelf: 'flex-end'
    },

    infoViewStyle: {
        flex: 1,
        flexDirection: "column"
    },
    itemTextStyle: {
        fontSize:15
    },
    itemStyle: {
        height:"10%"
    },
    orderStatusItemStyle: {
        flex:1,
        marginLeft:10,
        flexDirection:"column",
        alignItems:"center"
    },
    orderStatusImgStyle: {
        marginTop:4
    },
    orderStatusTitleStyle: {
        marginTop:7,
        fontSize:13
    }

});

export default connect(ReduxProps.mapStateToProps)(HomeScene);