/**
 * Created by Bingo on 2017/9/17.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import {Align, Color}from "../css"


class EmptyView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let title =  this.props.title === undefined ? "暂无数据" : this.props.title;
        return (
            <View style={[ Align.center, this.props.style, {backgroundColor:"white", flex:1, width:"100%"}]}>
                <Text style={[{color:"red"}]}>{title}</Text>
            </View>)
    }
}

export default EmptyView;