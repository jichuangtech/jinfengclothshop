import {screen} from "../common";

const DEF_WIDTH_PERCENT = 0.3;
const DEF_HEIGHT_PERCENT = 0.3;

/**
 * 返回的是json对象，其实上是Style样式对象
 * @param wPercent 0.0 ～ 1.0
 * @param hPercent 0.0 ～ 1.0
 */
function percent(wPercent, hPercent) {
    wPercent = arguments[0] ? arguments[0] : DEF_WIDTH_PERCENT;
    hPercent = arguments[1] ? arguments[1] : DEF_HEIGHT_PERCENT;

    return {
        width: screen.width * wPercent,
        height: screen.height * hPercent
    }
}

function percentW(wPercent) {
    wPercent = arguments[0] ? arguments[0] : DEF_WIDTH_PERCENT;

    return {
        width: screen.width * wPercent,
        height: screen.width * wPercent
    }
}

function percentH(hPercent) {
    hPercent = arguments[0] ? arguments[0] : DEF_HEIGHT_PERCENT;

    return {
        width: screen.height * hPercent,
        height: screen.height * hPercent
    }
}

export default {
    percent, percentW, percentH
}