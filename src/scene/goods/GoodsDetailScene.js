/**
 * Created by Bingo on 2017/9/13.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import * as LoginType from '../../constant/loginType';
import {connect} from 'react-redux';
import {StringUtils, Urls, RespUtils, NetUtils, ReduxProps} from "../../utils";
import Align from "../../css/Align";
import {SpacingView} from "../../widget"

class GoodsDetailScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            querying: true,
        }
    }

    render() {
        const {params} = this.props.navigation.state;
        let view = (<Text>查询中</Text>);

        if (!this.state.querying) {
            let status = this.props.loginProps.status;
            let {goodsRemark, icon, goodsSpecs, goodsId, goodsDetailImages, goodsName} = this.state.goods;
            let spec = [];
            for (let key in goodsSpecs) {
                let specView = (
                    <Text key={key} style={[{color:"#FF6731", marginRight:10,}, GoodsDetailViewStyle.profileTextStyle]}>
                        ¥{goodsSpecs[key].specPrice}/{goodsSpecs[key].specName}
                    </Text>);
                spec.push(specView);
            }

            let detailImages = [];

            for (let key in goodsDetailImages) {
                let icon = goodsDetailImages[key].imageUrl;
                let imageView = (<Image
                    key={key}
                    source={{uri: Urls.PIC + icon}}
                    style={[GoodsDetailViewStyle.detailImage]}
                />);
                detailImages.push(imageView)
            }

            view = (<View style={[{flex:1, flexDirection:"column"}, GoodsDetailViewStyle.container]}>
                <ScrollView style={[{flex:1}]}>
                <View>
                <TouchableOpacity
                    onPress={() => this.onImagePress()}
                    style={GoodsDetailViewStyle.imageClick}
                >
                    <Image
                        source={{uri: Urls.PIC + icon}}
                        style={[GoodsDetailViewStyle.image]}
                    />
                </TouchableOpacity>

                <Text style={GoodsDetailViewStyle.profileTextStyle}>{goodsRemark}</Text>
                <Text style={GoodsDetailViewStyle.profileTextStyle}>{goodsName}</Text>
                <View style={[{flexDirection:"row"}]}>
                    {spec}
                </View>
                <SpacingView/>
                <TouchableOpacity
                    onPress={()=> this.chooseParam()}
                    style={[GoodsDetailViewStyle.itemStyle]}>
                    <View style={[{flexDirection:"row", flex:1}, Align.vCenter]}>
                        <View style={[Align.lLayout, {flex: 1, height: "100%", marginLeft:10},
                            Align.vCenter]}>
                            <Text style={[GoodsDetailViewStyle.itemTextStyle]}>选择 颜色分类</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <SpacingView/>

                <View style={[{flexDirection:"row"}, Align.vCenter, {  height:"6%"}]}>
                    <View style={[Align.center, {flex: 1, height: "100%", marginLeft:10}]}>
                        <Text style={[GoodsDetailViewStyle.itemTextStyle, ]}>
                            商品详情
                        </Text>
                    </View>
                </View>
                {detailImages}
                </View>
            </ScrollView>
                <View style={[{backgroundColor:"red", height:"9%", flexDirection:"row"}]}>
                    <TouchableOpacity style={[{flex:1, backgroundColor:"#FF6217"}, Align.center]}
                                      onPress={this.addCart()}
                    >
                        <Text style={[GoodsDetailViewStyle.btnTextStyle]}>加入购物车</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{flex:1, backgroundColor:"#FE4444"}, Align.center]}
                                      onPress={this.buy()}
                    >
                        <Text style={[GoodsDetailViewStyle.btnTextStyle]}>立即购买</Text>
                    </TouchableOpacity>
                </View>
            </View>);
        }

        return view;
    }

    chooseParam() {

    }

    addCart() {

    }

    buy() {

    }


    onImagePress() {
        this.props.dispatch({type: LoginType.LOGGED_ING})
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        this.queryGoods(params.goodsId)
    }


    queryGoods(goodsId) {
        let url = Urls.GOODS_BY_ID.format(goodsId);
        let self = this;
        NetUtils.get(url, null,
            (responseJson) => {
                self.renderGoods(responseJson)
            },
            (error) => {
                alert("请求失败 error: " + error);
            },
            (catchError) => {
                alert("捕获异常: " + catchError);
            })
    }

    renderGoods(json) {
        if (!RespUtils.isSuccess(json.statusCode)) {
            console.info("render Goods error, code: " + json.statusCode);
            return;
        }
        let goods = json.data;

        let g = {
            goodsId: goods.goodsId,
            catId: goods.catId,
            goodsRemark: goods.goodsRemark,
            icon: goods.originalImg,
            goodsSpecs: goods.goodsSpecs,
            goodsDetailImages: goods.goodsDetailImages,
            goodsName: goods.goodsName
        };

        this.setState({
            goods: g,
            querying: false,
        });
    }
}

const GoodsDetailViewStyle = StyleSheet.create({
    container: {
        backgroundColor:"white"
    },

    imageClick: {
        width: "100%",
        height: "50%",
        borderColor: "#f0f",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    detailImage: {
        width: "100%",
        height: "33%",
        borderColor: "#f0f",
        marginTop: "1%"
    },
    btnTextStyle: {
        color:"white",
        fontSize:15
    },

    itemStyle: {
        height:"10%"
    },
    itemTextStyle: {
        fontSize:15,
        fontWeight:"bold"
    },
    profileTextStyle: {
        fontWeight:"bold",
        marginLeft:15,
        marginTop:5,
        marginBottom:5
    }
});


export default connect(ReduxProps.mapStateToProps)(GoodsDetailScene);