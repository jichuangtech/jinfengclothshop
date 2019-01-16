import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import {connect} from "react-redux"
import {Button, Switch, InputItem, List, Toast} from 'antd-mobile-rn';
import * as LoginType from '../../constant/loginType';
import {NetUtils, Urls, RespUtils, ReduxProps, StringUtils} from "../../utils";

const TOAST_DURATION = 1.5

class LoginScene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogin: true,
            mobile: "17750224350",
            password: "qwe"

        }
    }

    render() {
        let loginMode = this.state.isLogin ? "none" : "flex"
        let RegMode = this.state.isLogin ? "flex" : "none"
        let buttonTitle = this.state.isLogin ? "登录" : "注册"
        return (
            <View style={LoginStyle.container}>
                <List
                    style={LoginStyle.inputContainerStyle}
                >
                    <InputItem
                        type="number"
                        onChange={(value) => this.onMobileChange(value)}
                        placeholder="手机号码">手机号码</InputItem>

                    <InputItem
                        type="password"
                        ref="password"
                        onChange={(value) => this.onPasswordChange(value)}
                        placeholder="密码">密码</InputItem>
                </List>

                <Button
                    onClick={() => this.onBtnClick()}
                    style={[LoginStyle.itemStyle]}
                >{buttonTitle}
                </Button>

                <View style={[LoginStyle.itemStyle, LoginStyle.operationStyle]}>
                    <TouchableOpacity
                        onPress={() => this.onLoginTipClick()}
                    ><Text style={[LoginStyle.operationItemStyle, {display: loginMode}]}>登录</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onRegTipClick()}
                    ><Text style={[LoginStyle.operationItemStyle, {display: RegMode}]}>注册</Text></TouchableOpacity>
                </View>

            </View>
        );
    }

    onMobileChange(mobile) {
        this.setState({
            mobile: mobile
        })
    }

    onPasswordChange(password) {
        this.setState({
            password: password
        })
    }

    onLoginTipClick() {
        this.setState({
            isLogin: true
        })
    }

    onRegTipClick() {

        this.setState({
            isLogin: false
        })

    }

    onBtnClick() {
        if (this.state.isLogin) {
            this.login()
        } else {
            this.register()
        }
    }


    register() {
        let registerInfo = {
            mobile: this.state.mobile,
            password: this.state.password
        }

        NetUtils.postJson(Urls.REGISTER, registerInfo, function (json) {
            if (RespUtils.isSuccess(json.statusCode)) {
                Toast.success("注册成功", TOAST_DURATION)
            } else {
                Toast.fail("注册失败:" + json.msg, TOAST_DURATION)
            }

        }, function (json) {
            Toast.fail("注册失败:" + JSON.stringify(json), TOAST_DURATION)
        });

    }

    login() {
        if(StringUtils.isNullOrEmpty(this.state.mobile)) {
            Toast.fail("手机号码不允许为空")
            return
        }

        if(StringUtils.isNullOrEmpty(this.state.password)) {
            Toast.fail("密码不允许为空")
            return
        }

        let loginInfo = {
            mobile: this.state.mobile,
            password: this.state.password
        }
        let that = this;

        NetUtils.postJson(Urls.LOGIN, loginInfo, function (json) {
            if (RespUtils.isSuccess(json.statusCode)) {
                Toast.success("登录成功", TOAST_DURATION, function () {

                    AsyncStorage.setItem("access_token", json.data.token, function () {
                        //1改变状态
                        that.props.dispatch({type: LoginType.LOGGED_IN})
                        //2跳转到主界面
                        that.props.navigation.goBack();
                    });

                })
            } else {
                Toast.fail("登录失败:" + json.msg, TOAST_DURATION)
            }
        }, function (json) {
            Toast.fail("登录失败:" + JSON.stringify(json), TOAST_DURATION)
        });

    }
}

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    },

    itemStyle: {
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

});


export default connect(ReduxProps.mapStateToProps)(LoginScene);