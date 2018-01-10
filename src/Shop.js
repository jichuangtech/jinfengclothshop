import React, { Component } from 'react';
import MainScene from "./MainScene";
import {Provider} from 'react-redux';
import store from './store/index';

class Shop extends Component {

    render() {
        return (<Provider
                    store={store}>
                    <MainScene />
                </Provider>);

    }
}

export default Shop