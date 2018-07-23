import React, { Component } from 'react';
import MainScene from "./MainScene";
import {Provider} from 'react-redux';
import store from './store/index';
import { connect,  } from 'dva/mobile';

class Shop extends React.Component {

    render() {
        // alert(" this.prop1s: " + JSON.stringify(this.props));
        return <MainScene/>
    }

    // render() {
    //     return (<Provider
    //                 store={store}>
    //                 <MainScene />
    //             </Provider>);
    //
    // }
}

// export default Shop;
export default Shop;