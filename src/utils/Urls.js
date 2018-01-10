
//服务器
const HOST = "https://www.jichuangtech.site";
const PROJ = "/clothshopserver"

//本地调试
// const HOST = "http://192.168.0.103:8070";
// const HOST = "http://172.20.10.3:8070";
// const PROJ = ""
const DOMAIN = HOST + PROJ
const COLOR_URL = DOMAIN + "/api/goodsInfo/color"
const ADD_GOODS_URL = DOMAIN + "/api/info/goods"

//图片还是一直使用服务器的
const PIC = "https://www.jichuangtech.site/clothshopserver/api/info/picture/"
const GOODS_CATEGORY_PIC = PIC;
const GOODS_CATEGORIES = DOMAIN + "/api/info/goodsCategories"
const GOODS_RECOMMEND = DOMAIN + "/api/info/goods/recommend"
const GOODS_HOT = DOMAIN + "/api/info/goods/hot"
const GOODS_BY_CATEGORY_ID = DOMAIN + "/api/info/goodsCategories/{0}/goods"
const GOODS_BY_ID = DOMAIN + "/api/info/goods/{0}";
const LOGIN = DOMAIN + "/api/user/login"
const REGISTER = DOMAIN + "/api/user/register"
const LOGOUT = DOMAIN + "/api/user/logout"
const ORDERS_BY_STATUS = DOMAIN + "/api/order/16777215/{0}"
const ORDER_DETAIL = DOMAIN + "/api/order/detail/{0}"


const REGISTER_SUCCESS = "register_success"
const REGISTER_FAIL = "register_fail"
const REGISTER_ERROR = "register_error"

export {
    COLOR_URL, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_ERROR, ADD_GOODS_URL, GOODS_CATEGORY_PIC,
    GOODS_CATEGORIES, GOODS_RECOMMEND, PIC, GOODS_HOT, GOODS_BY_CATEGORY_ID, GOODS_BY_ID, LOGIN, REGISTER
    ,LOGOUT, ORDERS_BY_STATUS, ORDER_DETAIL
}