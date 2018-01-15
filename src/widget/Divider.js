/**
 * Created by Bingo on 2017/9/17.
 */
import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Color}from "../css"


class Divider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<View style={[{backgroundColor:Color.background, width:"100%", height:1, marginTop:6}]}/>)
    }
}

export default Divider;