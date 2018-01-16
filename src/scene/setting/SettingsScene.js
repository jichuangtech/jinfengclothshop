
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
import {Button, Switch, InputItem, List, Toast, Modal} from 'antd-mobile';
import {LoginType} from "../../constant"
import SizeStyle from "../../utils/SizeStyle";
import Align from "../../css/Align";
import {SpacingView, OrderStatusItemView} from "../../widget"
import {screen} from "../../common"
import {OrderStatus} from "../../constant";
const alert = Modal.alert;

class SettingsScene extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[SettingStyle.container]}>
                <Button
                    onClick={() => this.showConfirmDialog()}
                    style={[SettingStyle.btnStyle, {alignSelf:"center"}]}
                >注销
                </Button>

                <SpacingView/>
            </View>)
    }

    showConfirmDialog() {
        alert("注销", "确认要注销吗？", [
            {text:"确认", onPress: ()=> {
                this.logout();
             }},
        {text:"取消", onPress: ()=> {

            }},
        ]);
    }

    logout() {
        let that = this;
        AsyncStorage.removeItem("access_token", function (error) {
            //1改变状态
            that.props.dispatch({type: LoginType.LOGGED_OUT})
            //2跳转到主界面
            that.props.navigation.navigate("Login");
        });
    }

}

const SettingStyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white",
        height:"100%"
    },

    btnStyle: {
        marginTop: "2%",
        width: "85%",
        height: "7%",
        marginBottom: "2%",
    },

});

export default connect(ReduxProps.mapStateToProps)(SettingsScene);
