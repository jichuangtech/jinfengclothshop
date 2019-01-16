/**
 * Created by Bingo on 2017/9/17.
 */
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    CheckBox
} from 'react-native';

import {Checkbox} from 'antd-mobile-rn'
import {Align} from "../css";
import {DisplayUtils ,Urls, SizeStyle} from "../utils";
import {Divider} from "../widget"


class CarInfoView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            checkFrom:1   //1 代表来自外部按钮的  2 代表来自自己的变化
        }
    }

    /**
     * 此回调函数中可以进行 render()函数的调用
     * @param nextProps
     */

    componentWillReceiveProps(nextProps) {
        // alert(" componentWillReceiveProps next");
        this.setState({
            checkFrom:1
        })
    }

    /**
     *
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */

    shouldComponentUpdate(nextProps, nextState) {
        // alert(" shouldComponentUpdate ");
        return true;
    }

    /**
     * 此回调函数中可以进行 render()函数的调用 （不可以进行render()）
     * @param nextProps
     * @param nextState
     */

    componentWillUpdate(nextProps, nextState) {
        // alert(" componentWillUpdate ");
    }


    /**
     * 此回调函数中可以进行 render()函数的调用（不可以进行render()）
     * @param prevProps
     * @param prevState
     */

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let delViewDisplay = DisplayUtils.getDisplay(this.props.isEditMode);
        let checked = this.state.checkFrom === 2 ? this.state.isChecked : this.props.isAllSelect
        let cart = this.props.cart;
        return (
            <View style={[{flex:1}, Align.lLayout]}>
                <Checkbox style={[{marginLeft:10}]}
                          checked={checked}
                          onChange={ (checked)=> this.onCheckboxChange(checked)}
                />
                <Image style={[CarInfoViewStyle.image, {margin: 10}]}
                       source={{uri: Urls.PIC + cart.originalImg}}
                />
                <View style={[{width: "55%"}, Align.tLayout]}>
                    {/* 名字 */}
                    <View style={[{flex:5, marginTop:10}]}>
                        <Text>
                            {cart.goodsName}
                        </Text>
                    </View>

                    {/* 颜色 */}
                    <View style={[{flex:2.5, marginBottom:10}]}>
                        <Text>
                            {cart.color}
                        </Text>
                    </View>

                    {/* 规格 */}
                    <View style={[{flex:2.5, marginBottom:10}]}>
                        <Text>
                            ¥{cart.shopPrice}/{cart.specName}
                        </Text>
                    </View>
                    <Divider
                        style={{width:"100%"}}
                    />

                </View>
                {/* 删除按钮 */}
                <TouchableOpacity
                    style={[{flex:1, backgroundColor:"#f00", marginTop:10,
                        marginBottom:10, display:delViewDisplay}, Align.center]}
                    onPress={ ()=> this.onDelBtnClick()}
                >
                    <Text style={{color:"#fff"}}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onDelBtnClick() {
        // alert("进行删除")
    }

    onCheckboxChange(event) {
        this.setState({
            isChecked: event.target.checked,
            checkFrom:2
        })
    }

}

const CarInfoViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"column",
        width:"47%",
        height:100,
        marginTop:10,
        backgroundColor:"rgba(255,0,0,0.3)",
        marginLeft:"2%"
    },
    image: {
        width:80,
        height:80,
        borderWidth:1,
        borderColor:"gray",
    }

});

export default CarInfoView;