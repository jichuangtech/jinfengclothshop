/**
 * Created by zhuoy on 2017/6/27.
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */
import React from 'react';
import {
    Dimensions,
    PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                 //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例

class Px extends React.Component {

    /**
     * 设置text为sp
     * @param size sp
     * return number dp
     */
    static text(size) {
        size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
        return size / defaultPixel;
    }

    static function

    static layout(size) {
        size = Math.round(size * scale + 0.5);
        return size / defaultPixel;
    }
}

export default Px;

/**
 *
 *因为一般的设计稿都是以iphone6为基础来设计的，所以这里以iPhone6为基础写这个工具类，
 *当然如果你的不是，可以在上面更改，defaultPixelRatio改成你用的设备像素就好了。
 *
 **/