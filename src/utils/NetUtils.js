var React = require("react");


class NetUtils extends React.Component {

    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJson(url, data, successCallback, failCallback, errorCallback) {
        console.log("postJson url: " + url + ", data: " + JSON.stringify(data));
        let fetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOption)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            }, function (failMsg) {
                failCallback(failMsg)
            }).catch(function(error) {
                errorCallback(error)
            });
    }

    /**
     * get请求
     * url : 请求地址
     * callback : 回调函数
     */
    static getTest(url, callback) {
        var fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'host': "127.0.0.1",
                'Access-Token': sessionStorage.getItem('access_token') || ''
            }
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(responseText);
            }).catch((errorMsg) => {
            console.log("getTest errorMsg: " + errorMsg);
        });
    }

    /**
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */

    static get(url, params, successCallback, failCallback, errorCallback) {
        NetUtils.getJson(url, null, params, successCallback, failCallback, errorCallback);
    }

    /**
     *
     * @param url 请求地址
     * @param token 用于保存在header中的token
     * @param params
     * @param successCallback   成功回调
     * @param failCallback      失败回调
     * @param errorCallback     错误回调
     */
    static getJson(url, token, params, successCallback, failCallback, errorCallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        let fetchOption = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token':token
            }
        };
        //fetch请求
        fetch(url, fetchOption).then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            }, function (failMsg) {
                failCallback(failMsg)
            }).catch((error) => {
                errorCallback(error)
        });
    }

    /*
    *  delete请求
    *  url:请求地址
    *  params:参数
    *  callback:回调函数
    * */

    static delete(url, params, successCB, failCB) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((responseJson) => {
                successCB(responseJson);
            }).catch((error) => {
            failCB(error)
        });
    }
}


/*  第一种：'Content-Type': 'application/json'
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
 *  callback:回调函数
 * */
const postJSON = function (url, params, callback) {
    //fetch请求
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log("error = " + error)
        });
}

/*  第二种： form表单形式
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
 *  callback:回调函数
 * */
const postForm = function (url, params, callback) {
    //fetch请求
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log("error = " + error)
        });

}

export default NetUtils;


//将JSON数据转换成字符串
//JSON.stringify(params)

//将数据JSON化
//JSON.parse(responseJSON)