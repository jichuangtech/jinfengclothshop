/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';
import Shop from './src/Shop';
import React from 'react';

import dva, {connect} from 'dva/mobile';
import {browserHistory, hashHistory} from 'dva/router';
import createLogger from 'redux-logger';
import models from './src/models/index';

function delay(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const app = dva({
    history: browserHistory,
    onAction: createLogger(),
});

/**
 * 进行 dva 模块的注册
 */
app.model(require('./src/models/login').default);

// models.forEach((m) => {
//   app.model(m.default);
// });

app.router(() => <Shop/>);


AppRegistry.registerComponent('jfclothshop', () => app.start());
