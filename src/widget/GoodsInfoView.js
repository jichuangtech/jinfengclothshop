/**
 * Created by Bingo on 2017/9/17.
 */
import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    tool,
    screen
}
    from "../common";
import * as Urls from "../utils/Urls"

const widthStyle = {
    width: screen.width /2.1
}

class GoodsInfoView extends Component {

    constructor(props) {
        super(props);
    }

    getImageSizeStyle() {
        let width = screen.width / 1.8;
        let height = width;
        let size = {
            width: width,
            height: height
        }

        return size;
    }

    render() {
        // onPress={ () => {onPressed && onPressed(goodsId)}} 如果写成   onPress={onPressed && onPressed(goodsId)}
        // 则不会被执行
        let {goodsRemark, icon, goodsSpecs, goodsId} = this.props.goods;
        let {onPressed} = this.props.goods = this.props;
        let specsView = [];
        for (let key in goodsSpecs) {
            let spec = goodsSpecs[key]
            let view = (
                <Text style={[{color: "red", marginRight: 10}]} key={key}>¥{spec.specPrice}/{spec.specName}</Text>)
            specsView.push(view)
        }


        return (
            <TouchableOpacity
                onPress={() => {
                    onPressed && onPressed(goodsId)
                }}
            >
                <View
                    style={[GoodsInfoViewStyle.container, widthStyle]}
                >
                    <Image
                        resizeMode='stretch'
                        source={{uri: Urls.PIC + icon}}
                        style={[GoodsInfoViewStyle.image]}
                    />
                    <Text style={[{marginTop: 5}]}>{goodsRemark}</Text>
                    <View style={[{flexDirection: "row"}]}>
                        {specsView}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const GoodsInfoViewStyle = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        height: 100,
        marginTop: 10,
        marginLeft: "2.5%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom:45
    },
    image: {
        width: "100%",
        height: "100%",
    }

});

export default GoodsInfoView;