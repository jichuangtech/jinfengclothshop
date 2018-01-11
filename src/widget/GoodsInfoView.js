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

const hWidthStyle = {
    width: screen.width
}

const vWidthStyle = {
    width: screen.width / 2.1
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

    static isRow(orientation) {
        return orientation === "row"
    }


    render() {
        // onPress={ () => {onPressed && onPressed(goodsId)}} 如果写成   onPress={onPressed && onPressed(goodsId)}
        // 则不会被执行
        let containerStyle = this.getContainerStyle()
        let imageStyle = this.getImageStyle()
        let itemWidthStyle = this.getItemWidthStyle()
        let textStyle = this.getTextStyle()
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
                    style={[containerStyle, itemWidthStyle]}
                >
                    <Image
                        resizeMode='stretch'
                        source={{uri: Urls.PIC + icon}}
                        style={[imageStyle]}
                    />
                    <View style={[{flexDirection:"column"}]}>
                        <Text style={[textStyle]}>{goodsRemark}</Text>
                        <View style={[{flexDirection: "row"}]}>
                            {specsView}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    getTextStyle() {
        let text = GoodsInfoView.isRow(this.props.orientation) ? GoodsInfoViewStyle.hTextStyle : GoodsInfoViewStyle.vTextStyle
        return text;
    }

    getItemWidthStyle() {
        let width = GoodsInfoView.isRow(this.props.orientation) ? hWidthStyle : vWidthStyle
        return width;
    }

    getImageStyle() {
        let imageStyle = GoodsInfoView.isRow(this.props.orientation) ? GoodsInfoViewStyle.hImage : GoodsInfoViewStyle.vImage
        return imageStyle;
    }

    getContainerStyle() {
        let containerStyle = GoodsInfoView.isRow(this.props.orientation) ? GoodsInfoViewStyle.hContainer : GoodsInfoViewStyle.vContainer
        return containerStyle;
    }
}

const GoodsInfoViewStyle = StyleSheet.create({
    vContainer: {
        flex: 1,
        flexDirection: "column",
        height: 100,
        marginTop: 10,
        marginLeft: "2.5%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 45
    },
    vImage: {
        width: "100%",
        height: "100%",
    },

    vTextStyle: {
        marginTop: 5
    },

    hContainer: {
        flex: 1,
        width:"100%",
        flexDirection: "row",
        height: 100,
        marginLeft: "2.5%",
    },

    hImage: {
        width: 60,
        height: 60,
        alignSelf:"center",
        marginRight: 15
    },

    hTextStyle: {
        marginTop: 35,
    },

});

GoodsInfoView.propTypes = {
    orientation: React.PropTypes.string
};

GoodsInfoView.defaultProps = {
    orientation: "column"   // row column
};

export default GoodsInfoView;