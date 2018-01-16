/**
 * Created by Bingo on 2017/9/13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper'
import {GoodsInfoView, SpacingView} from "../../widget"
import NetUtils from "../../utils/NetUtils"
import * as Urls from "../../utils/Urls";
import * as RespUtils from "../../utils/RespUtils";

class HomeScene extends Component {
    static staticMemVal = "静态成员  变量定义";

    static staticSay() {
        alert("我是静态成员方法定义 ");
    }

    constructor(props) {
        super(props);

        this.state = {
            isRefreshing: true,
            isCategoryRefreshing: true,
            cateMenuInfo: [],
            hotGoods: [],
            recommendGoods: []
        }

        this._memeVal = "我是成员变量 "; //成员变量的定义
    }

    refreshCategory() {
        this.setState({
            isCategoryRefreshing: true
        });

        this.queryCategory()
    }

    refresh() {
        this.setState({
            isRefreshing: true
        });

        this.queryHotGoods()
    }

    onMenuSelected(index) {
        let {navigate} = this.props.navigation;

        let cateInfo = {
            cateId: index
        };

        navigate("GoodsList", cateInfo);
    }

    render() {
        let recommendGoodsViews = [];
        let recommendGoods = this.state.recommendGoods;
        for (let key in recommendGoods) {
            let goods = recommendGoods[key];
            let view = (
                <TouchableOpacity
                    key={key}
                    onPress={() => this.showGoodsDetailView(goods.goodsId)}
                >
                    <Image
                        style={[{justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}]}
                        source={{uri: Urls.GOODS_CATEGORY_PIC + goods.originalImg}} resizeMode='stretch'/>
                </TouchableOpacity>

            );
            recommendGoodsViews.push(view)
        }

        return (
            <View style={HomeStyle.rootView}>
                <View
                    style={[{height: "20%"}]}
                >
                    <Swiper
                        autoplay={true}
                        loop={true}
                        index={0}
                        horizontal={true}
                    >
                        {recommendGoods.length === 0 ? <Text>正在推荐的商品...</Text> : recommendGoodsViews}
                    </Swiper>
                </View>
                <SpacingView/>

                <FlatList
                    numColumns={4}
                    horizontal={false}
                    style={HomeStyle.categoryFlat}
                    onRefresh={() => this.refreshCategory()}
                    refreshing={this.state.isCategoryRefreshing}
                    data={this.state.cateMenuInfo}
                    renderItem={({item, index}) =>
                        (<TouchableOpacity
                            key={index}
                            onPress={() => this.onMenuSelected(item.id)}
                            style={[{flex: 1}]}
                        >
                            <View key={index}
                                  style={{flexDirection: "column", flex: 1, alignItems: "center"}}>
                                <Image source={{uri: Urls.GOODS_CATEGORY_PIC + item.icon}} resizeMode='stretch'
                                       style={[HomeStyle.categoryImgStyle]}/>
                                <Text style={[{fontSize: 18}]}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>)
                    }
                />

                <SpacingView/>

                <FlatList
                    numColumns={2}
                    horizontal={false}
                    style={HomeStyle.flat}
                    onRefresh={() => this.refresh()}
                    refreshing={this.state.isRefreshing}
                    data={this.state.hotGoods}
                    renderItem={({item, index}) =>
                        <GoodsInfoView
                            key={index}
                            onPressed={(goodsId) => this.showGoodsDetailView(goodsId)}
                            goods={item}
                        />
                    }
                />
            </View>
        );
    }


    showGoodsDetailView(goodsId) {
        const {navigate} = this.props.navigation
        // Alert.alert("提示", "被点击的推荐的产品的id为 : " + goodsId
        //     + ", navigate: " + navigate
        //     + ", navigate2: " + JSON.stringify(this.props.navigation));

        let goodsInfo = {
            goodsId: goodsId
        };
        navigate('GoodsDetail', goodsInfo);
    }

    componentDidMount() {
        this.queryRecommendGoods()
        this.queryCategory()
        this.queryHotGoods()
        // const { navigate } = this.props.navigation;
        // navigate('Settings');
    }

    queryRecommendGoods() {
        let url = Urls.GOODS_RECOMMEND;
        let self = this;
        NetUtils.get(url, null,
            (responseJson) => {
                self.updateRecommendGoods(responseJson)
            },
            (error) => {
                alert("请求失败 error: " + JSON.stringify(error));
            },
            (catchError) => {
                alert("捕获异常: " + catchError);
            })
    }

    updateRecommendGoods(goods) {
        this.setState({
            recommendGoods: goods.data
        })
    }

    queryCategory() {
        let url = Urls.GOODS_CATEGORIES;
        let self = this;
        NetUtils.get(url, null,
            (responseJson) => {
                self.updateCategory(responseJson)
            },
            (error) => {
                alert("请求失败 error: " + error);
            },
            (catchError) => {
                alert("捕获异常: " + catchError);
            })
    }

    updateCategory(json) {
        if (!RespUtils.isSuccess(json.statusCode)) {
            console.info("home query category error, code: " + json.statusCode);
            return;
        }
        let data = [];
        let categories = json.data;
        for (let index = 0; index < categories.length; index++) {

            let row = {
                key: '' + index,
                title: categories[index].name,
                icon: categories[index].image,
                id: categories[index].id
            };

            data.push(row);
        }

        this.setState({
            cateMenuInfo: data,
            isCategoryRefreshing: false,

        });
    }

    queryHotGoods() {
        let url = Urls.GOODS_HOT;
        let self = this;
        NetUtils.get(url, null,
            (responseJson) => {
                self.updateHotGoods(responseJson)
            },
            (error) => {
                alert("请求失败 error: " + JSON.stringify(error));
            },
            (catchError) => {
                alert("捕获异常: " + catchError);
            })
    }

    updateHotGoods(json) {
        if (!RespUtils.isSuccess(json.statusCode)) {
            console.info("home query hot Goods error, code: " + json.statusCode);
            return;
        }
        let data = [];
        let goods = json.data;
        for (let index = 0; index < goods.length; index++) {

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
            hotGoods: data,
            isRefreshing: false,
        });
    }

}

const HomeStyle = StyleSheet.create({

    menu: {
        height: "25%"
    },

    rootView: {
        display: "flex",
        backgroundColor: "white",
    },

    flat: {
        height: "75%"
    },

    categoryFlat: {
        height: "20%"
    },

    categoryImgStyle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "gray"
    }


});

//ES6语法进行 属性的类型声明 和 默认值
HomeScene.propTypes = {
    orientation: React.PropTypes.string
};

HomeScene.defaultProps = {
    orientation: "row"   // row column
};


export default HomeScene;