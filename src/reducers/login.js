import * as LoginType from '../constant/loginType';

const initialState = {
    isLoggedIn : false,
    user: {},
    status: "unknown",
    tip:"未知",
};

function login(state=initialState, action) {

    switch (action.type) {
        case LoginType.LOGGED_ING:
            return {
                isLoggedIn: false,
                status: 'ing',
                tip:"登录中"
            };

        case LoginType.LOGGED_IN:
            return {
                isLoggedIn: true,
                status: 'in',
                tip:"登录成功"
            };

        case LoginType.LOGGED_OUT:
            return {
                isLoggedIn: false,
                status: 'log_out',
                tip:"退出 "
            };
            break;

        case LoginType.LOGGED_ERROR:
            return {
                isLoggedIn: false,
                status: 'error',
                tip:action.tip
            };
            break;

        default:
            return state;
    }
}

export default login