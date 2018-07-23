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


function delay(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const app = dva({
    history: browserHistory,
    onAction: createLogger(),
});
app.model({
    namespace: 'count',
    state: {
        num: 0
    },
    reducers: {
        add(state) {
            return {
                ...state,
                num: state.num + 1
            }
        },
    },
    effects: {
        * addDelay(action, {call, put}) {
            yield call(delay, 1000);
            yield put({type: 'add'});
        },
    },
    subscriptions: {
        setup({dispatch}) {
            // dispatch({type: 'add'});
        },

    },
});

app.router(() => <Shop/>);


AppRegistry.registerComponent('jfclothshop', () => app.start());
