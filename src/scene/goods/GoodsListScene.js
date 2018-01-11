/**
 * Created by Bingo on 2017/9/13.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    NativeModules,
    DeviceEventEmitter,
    FlatList,
} from 'react-native';
import NetUtils from "../../utils/NetUtils"
import {GoodsInfoView, SpacingView} from "../../widget"
import * as Urls from "../../utils/Urls"
import * as RespUtils from "../../utils/RespUtils"

class GoodsListScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cateId: -1,
            isRefreshing:true,
            goods:[]
        };

    }

    render() {
        const { params } = this.props.navigation.state;
        let goodsSize = this.state.goods.length;
        let tipVisible = this.state.isRefreshing || goodsSize > 0 ?  "none" : "flex";

        let tipStyle = {
            display: tipVisible
        };

        let listVisible = this.state.isRefreshing || goodsSize > 0 ?  "flex" : "none";

        let listStyle = {
            display: listVisible
        };

        return (<View style={[{backgroundColor:"#fff"}]}>
            <FlatList
                numColumns={1}
                horizontal={false}
                style={[MyStyle.flat, listStyle]}
                onRefresh={() => this.refresh(params.cateId)}
                refreshing={this.state.isRefreshing}
                data={this.state.goods}
                ItemSeparatorComponent={SpacingView}
                renderItem={({item, index}) =>
                    <GoodsInfoView
                        orientation="row"
                        onPressed={ (goodsId) => this.onGoodsPressed(goodsId)}
                        goods={item}
                    />
                }
            />

            <Text style={tipStyle} >暂无商品</Text>
        </View>);
    }

    refresh(cateId) {
        this.setState({
            isRefreshing:true
        });

        this.queryGoodsByCateId(cateId)
    }

    onGoodsPressed(goodsId) {
        const { navigate } = this.props.navigation;
        let goodsInfo = {
            goodsId:goodsId
        };
        navigate('GoodsDetail', goodsInfo);
    }


    componentDidMount() {
        let { params } = this.props.navigation.state;
        this.queryGoodsByCateId(params.cateId);
    }

    queryGoodsByCateId(cateId) {
        let self = this;
        let url = Urls.GOODS_BY_CATEGORY_ID.format(cateId)

        NetUtils.get(url,null,
            (responseJson)=> {
                self.updateGoodsList(responseJson)
            },
            (error)=>{alert("请求失败 error: " + error);},
            (catchError)=>{alert("捕获异常: " + catchError);})

    }

    updateGoodsList(json) {
        if(!RespUtils.isSuccess(json.statusCode)) {
            console.info("goods list query Goods error, code: " + json.statusCode);
            return;
        }
        let data = [];
        let goods = json.data;
        for(let index = 0; index < goods.length; index ++) {

            let row = {
                key: '' + index,
                goodsId: goods[index].goodsId,
                catId: goods[index].catId,
                goodsRemark: goods[index].goodsRemark,
                icon: goods[index].originalImg,
                goodsSpecs: goods[index].goodsSpecs,
            };
            data.push(row);
        }

        this.setState({
            goods: data,
            isRefreshing:false,
        });
    }

}

const MyStyle = StyleSheet.create({
    flat: {
        height: "90%",
    }


});

export default GoodsListScene;