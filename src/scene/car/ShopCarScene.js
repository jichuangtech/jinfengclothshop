/**
 * Created by Bingo on 2017/9/13.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Checkbox} from 'antd-mobile'
import {Align} from '../../css';
import {CarInfoView} from "../../widget";


class ShopCarScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAllSelect: false,
            isRefreshing: false,
            car:[
                {key: "" + 0},
                {key: "" + 1},
                {key: "" + 2},
                {key: "" + 3},
                {key: "" + 4},
                {key: "" + 5},
                {key: "" + 6},
                {key: "" + 7},
            ],
            isEditMode: false
        }
    }

    render() {
        let sum = 1
        let isAllSelect = this.state.isAllSelect
        let editTitle = this.state.isEditMode ? "完成" : "编辑"
        return (<View style={CarStyle.container}>
            <Text>我是购物车</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{flex: 1}}>
                    <Checkbox style={{backgroundColor: "#fbceff",}}
                              checked={isAllSelect}
                              onChange={(event) => this.onAllSelectChange(event)}>金凤针织
                    </Checkbox>
                </View>

                <View style={[{flex: 1}, Align.rLayout]}>
                    <TouchableOpacity
                        onPress={() => this.onEditBtnClick()}
                    >
                        <Text style={{marginRight: 10}}>{editTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height: "85%"}}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    onRefresh={() => this.refresh()}
                    refreshing={this.state.isRefreshing}
                    data={this.state.car}
                    renderItem={({item,index}) =>
                        <CarInfoView
                            key={index}
                            isEditMode={this.state.isEditMode}
                            isAllSelect={this.state.isAllSelect}
                        />
                    }
                />
            </View>

            <View style={{backgroundColor: "#0f0", flex: 1, flexDirection: "row", alignItems: "center"}}>
                <View style={[{flex: 1}, Align.lLayout]}>
                    <Checkbox style={{marginLeft:10}}
                              checked={isAllSelect}
                              onChange={(event) => this.onAllSelectChange(event)}>全选
                    </Checkbox>
                </View>

                <View style={[{flex: 1, height: "100%"}, Align.rLayout]}>
                    <View style={[{flex: 1,}, Align.rLayout]}><Text style={[{marginRight:10}, Align.centerView]}>合计:{sum}</Text></View>
                    <TouchableHighlight
                        style={[{flex: 1, backgroundColor:"gray"}, Align.center]}
                        underlayColor="#89FFC3"
                        onPress={()=> this.pay()}
                    >
                        <Text>结算</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </View>);
    }

    onCarInfoCheckChange(index, checked) {
        alert(" onCarInfoCheckChange index: " + index + ", checked: " + checked )
    }

    pay() {

    }

    onAllSelectChange(event) {
        this.setState({
          isAllSelect: event.target.checked
        })
    }

    refresh() {
        alert("进行刷新")
    }

    onEditBtnClick() {
        this.setState({
            isEditMode:!this.state.isEditMode
        })
    }

}

const CarStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fbceff"
    },


});

export default ShopCarScene;