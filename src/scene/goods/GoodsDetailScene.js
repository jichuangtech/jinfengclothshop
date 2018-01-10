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
    TouchableOpacity
} from 'react-native';
import * as LoginType from '../../constant/loginType';
import {connect} from 'react-redux';
import {StringUtils, Urls, RespUtils, NetUtils, ReduxProps} from "../../utils";

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
            let {goodsRemark, icon, goodsSpecs, goodsId, goodsDetailImages} = this.state.goods;
            let spec = [];
            for(let key in goodsSpecs) {
                let specView = (<Text key={key}>规格名字：{goodsSpecs[key].specName}， 规格价格：{goodsSpecs[key].specPrice}</Text>);
                spec.push(specView);
            }

            let detailImages = [];

            for(let key in goodsDetailImages) {
                let icon = goodsDetailImages[key].imageUrl;
                let imageView = (<Image
                                    key={key}
                                    source={{uri: Urls.PIC + icon}}
                                    style={[GoodsDetailViewStyle.detailImage]}
                                />);
                detailImages.push(imageView)
            }

            view = (<ScrollView><View>
                <Text>我是商品详情界面,id: {params.goodsId}, 登录状态: {status}</Text>
                <TouchableOpacity
                    onPress={() => this.onImagePress()}
                    style={GoodsDetailViewStyle.imageClick}
                >
                    <Image
                        source={{uri: Urls.PIC + icon}}
                        style={[GoodsDetailViewStyle.image]}
                    />
                </TouchableOpacity>

                <Text>商品简介:{goodsRemark}</Text>
                <Text>商品id:{goodsId}</Text>
                {spec}
                {detailImages}
            </View></ScrollView>);
        }

        return view;
    }

    onImagePress() {
        this.props.dispatch({type: LoginType.LOGGED_ING})
    }


    componentWillMount() {
        if(this.props.loginProps.status !== "in") {
            const { navigate } = this.props.navigation;
            navigate('Login');
        }
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
            goodsDetailImages:goods.goodsDetailImages
        };

        this.setState({
            goods: g,
            querying: false,
        });
    }
}

const GoodsDetailViewStyle = StyleSheet.create({
    imageClick: {
        width: "100%",
        height: "30%",
        borderColor:"#f0f",
        borderWidth:1
    },

    image: {
        width: "100%",
        height: "100%",
    },

    detailImage: {
        width: "100%",
        height: "33%",
        borderColor:"#f0f",
        borderWidth:1,
        marginTop:"1%"
    }
});


export default connect(ReduxProps.mapStateToProps)(GoodsDetailScene);