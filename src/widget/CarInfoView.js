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

import {Checkbox} from 'antd-mobile'
import {Align} from "../css";
import {DisplayUtils ,Urls, SizeStyle} from "../utils";


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
     * 此回调函数中可以进行 render()函数的调用
     * @param nextProps
     * @param nextState
     */

    componentWillUpdate(nextProps, nextState) {
        // alert(" componentWillUpdate ");
    }


    /**
     * 此回调函数中可以进行 render()函数的调用
     * @param prevProps
     * @param prevState
     */

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let delViewDisplay = DisplayUtils.getDisplay(this.props.isEditMode);
        let checked = this.state.checkFrom === 2 ? this.state.isChecked : this.props.isAllSelect
        return (
            <View style={[{flex:1}, Align.lLayout]}>
                <Checkbox style={[{marginLeft:10}, SizeStyle.percent(0.069, 0.04)]}
                          checked={checked}
                          onChange={ (checked)=> this.onCheckboxChange(checked)}
                />
                <Image style={[CarInfoViewStyle.image, {margin: 10, backgroundColor:"#00f"}]}
                       source={{uri: Urls.PIC + "cloth_goods_2_title.jpg3"}}
                />
                <View style={[{width: "55%"}, Align.tLayout]}>
                    {/* 上面*/}
                    <View style={[{flex:2.5, backgroundColor:"#00f", marginTop:10}]}>
                        <Text>
                            美国网
                        </Text>
                    </View>

                    {/* 下面*/}
                    <View style={[{flex:1.5, backgroundColor:"#0f0", marginBottom:10}]}>
                        <Text>
                            西瓜红
                        </Text>
                    </View>

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
        backgroundColor: "red",
    }

});

export default CarInfoView;