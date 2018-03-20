/**
 * Created by Bingo on 2017/9/13.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import { Checkbox} from 'antd-mobile'
import {Align} from '../../css';
import {CarInfoView,Divider} from "../../widget";
import {Urls, NetUtils, ReduxProps, RespUtils} from "../../utils"
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Router} from "../../constant"


class ShopCarScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAllSelect: false,
            isRefreshing: false,
            carts:[],
            isEditMode: false
        }
    }

    render() {
        let sum = 1
        let isAllSelect = this.state.isAllSelect
        let editTitle = this.state.isEditMode ? "完成" : "编辑"
        return (
            <View style={CarStyle.container}>
            <View style={{flexDirection: "row", alignItems: "center", marginTop:10}}>
                <View style={{flex: 1}}>
                    <Checkbox
                              checked={isAllSelect}
                              onChange={(event) => this.onAllSelectChange(event)}>
                        金凤针织
                    </Checkbox>
                </View>

                <View style={[{flex: 1}, Align.rLayout]}>
                    <TouchableOpacity
                        onPress={() => this.onEditBtnClick()}
                    >
                        <Text style={{marginRight: 10}}>{editTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height: "85%"}}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    onRefresh={() => this.refresh()}
                    refreshing={this.state.isRefreshing}
                    data={this.state.carts}
                    renderItem={({item,index}) =>
                        <CarInfoView
                            key={index}
                            cart={item.obj}
                            isEditMode={this.state.isEditMode}
                            isAllSelect={this.state.isAllSelect}
                        />
                    }
                />
            </View>

            <Divider
                style={[{width:"100%"}]}
            />
            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <View style={[{flex: 1}, Align.lLayout]}>
                    <Checkbox style={{marginLeft:10}}
                            checked={isAllSelect}
                              onChange={(event) => this.onAllSelectChange(event)}>全选
                    </Checkbox>
                </View>

                <View style={[{flex: 1, height: "100%"}, Align.rLayout]}>
                    <View style={[{flex: 1,}, Align.rLayout]}><Text style={[{marginRight:10}, Align.centerView]}>合计:{sum}</Text></View>
                    <TouchableHighlight
                        style={[{flex: 1, backgroundColor:"gray"}, Align.center]}
                        underlayColor="#89FFC3"
                        onPress={()=> this.pay()}
                    >
                        <Text>结算</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </View>);
    }

    onCarInfoCheckChange(index, checked) {
        alert(" onCarInfoCheckChange index: " + index + ", checked: " + checked )
    }

    pay() {

    }

    onAllSelectChange(event) {
        this.setState({
          isAllSelect: event.target.checked
        })
    }

    refresh() {
        this.queryCart()
    }

    onEditBtnClick() {
        this.setState({
            isEditMode:!this.state.isEditMode
        })
    }

    componentDidMount() {
        if(this.isLogin()) {
            this.queryCart()
        } else {
            console.log("还没登录")
        }

        DeviceEventEmitter.addListener('onTabShow',
            (value) => {
                if(value !== Router.CART) {
                    return
                }
                if(this.isLogin()) {
                    this.queryCart()
                } else {
                    const { navigate } = this.props.navigation;
                    // navigate('Login');
                    this.resetRouter();
                }
                // alert("ShopCart show: " + value)
            })
        DeviceEventEmitter.addListener('onTabHidden',
            (value) => {
            // alert("ShopCart hidden: " + value)
        })
    }

    resetRouter() {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Tab'}),
                NavigationActions.navigate({ routeName: 'Login'})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    queryCart() {
        let self = this;
        let url = Urls.CART;

        AsyncStorage.getItem("access_token", function (error, value) {
            if(error === null) {
                NetUtils.getJson(url, value, null,
                    (responseJson)=> {
                        self.updateCart(responseJson)
                    },
                    (error)=>{alert("请求失败 error: " + error);},
                    (catchError)=>{alert("捕获异常: " + catchError);})
            }
        });

    }

    updateCart(cartJson) {
        if(!RespUtils.isSuccess(cartJson.statusCode)) {
            console.log(" not success ");
            return
        }
        let carts = [];
        let a = 1;
        for(let index in cartJson.data) {
            let cart = cartJson.data[index]
            let cartObj = {
                key: index,
                obj: cart
            };

            carts.push(cartObj);
        }

        this.setState({
            carts: carts
        })

    }

    isLogin() {
        return this.props.loginProps.status === "in"
    }

    componentWillMount() {
        if(this.props.loginProps.status !== "in") {
            const { navigate } = this.props.navigation;
            // alert("navigation: " + JSON.stringify(this.props.navigation))
            // navigate('Login');
        }
    }

}

const CarStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor:"white"
    },


});

export default connect(ReduxProps.mapStateToProps)(ShopCarScene);